import {
  handler,
  initArchetypes,
  initEntities,
  sockets,
} from "../api/app/handler.ts";
import { Entities } from "../api/app/entities.ts";
import { Archetypes } from "../api/app/archetypes.ts";

type Players = {
  controls: { up: boolean; down: boolean; left: boolean; right: boolean }[]; // remove from here ?
  deceleration: number[];
  moment: [x: number, y: number][];
  position: [x: number, y: number][];
  radius: number[];
  speed: number[];
};

type Rocks = {
  deceleration: number[];
  moment: [x: number, y: number][];
  position: [x: number, y: number][];
  radius: number[];
};

let globalEntities: any[][];

let globalArchetypes: {
  players: Players;
  rocks: Rocks;
};

function main() {
  const entities: any[][] = [[], []];
  Entities.setEntities(entities);
  Entities.loadEntities();

  const archetypes: any = {
    // prettier-ignore
    players: { controls: [], deceleration: [], moment: [], position: [], radius: [], speed: [] },
    rocks: { deceleration: [], moment: [], position: [], radius: [] },
  };
  Archetypes.setArchetypes(archetypes);
  Archetypes.loadArchetypes();
  globalArchetypes = archetypes;
  initArchetypes(archetypes);

  globalEntities = entities;
  initEntities(entities);

  startUpdateLoop();

  Deno.serve({
    port: 8443,
    handler: handler,
  });
}

const targetFps = 60;
const frameTime = 1000 / targetFps;
let lastTime = performance.now();

function startUpdateLoop() {
  const now = performance.now();
  const deltaTime = now - lastTime;

  if (deltaTime >= frameTime) {
    const fps = Math.round(targetFps / (deltaTime / frameTime));
    // console.log(fps)
    // Entities.updateEntities() // deltaTime
    Archetypes.updateArchetypes();
    // console.log(globalArchetypes.players.position)

    // String
    // const data = JSON.stringify(globalEntities)
    // const data = JSON.stringify(globalArchetypes)

    // Binary
    // const data = new Int32Array(2)
    // data[0] = globalEntities[0][0].position.x
    // data[1] = globalEntities[0][0].position.y

    // ---
    // String
    // const pools = {
    //   players: {
    //     positions: globalArchetypes.players.position,
    //     // radius: globalArchetypes.players.radius,
    //   },
    //   rocks: {
    //     positions: globalArchetypes.rocks.position,
    //     // radius: globalArchetypes.rocks.radius,
    //   },
    // }
    // const data = JSON.stringify(pools)
    // ---

    // ---
    // Binary
    // const players = globalArchetypes.players.position.flatMap(
    //   (obj: { x: number; y: number }) => [obj.x, obj.y]
    // )
    // const rocks = globalArchetypes.rocks.position.flatMap(
    //   (obj: { x: number; y: number }) => [obj.x, obj.y]
    // )

    const nbPlayers = [globalArchetypes.players.position.length];
    const nbRocks = [globalArchetypes.rocks.position.length];
    const players = globalArchetypes.players.position.flat();
    const rocks = globalArchetypes.rocks.position.flat();

    const array = nbPlayers.concat(players).concat(nbRocks).concat(rocks);
    // console.log(array)

    // const rocks = new Float32Array(globalArchetypes.players.position)
    // const data = new Float32Array([
    //   globalArchetypes.players.position.length,
    //   ...players,
    //   globalArchetypes.rocks.position.length,
    //   ...rocks,
    // ])
    const data = new Float32Array(array);
    // ---

    // console.log(new Float32Array(data))

    for (const socket of sockets) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    }

    // console.log(`FPS: ${Math.round(1000 / deltaTime)}`)

    // Correct for drift
    lastTime = now - (deltaTime % frameTime);
  }

  setTimeout(startUpdateLoop, Math.max(0, frameTime - deltaTime));
}

export { main };
