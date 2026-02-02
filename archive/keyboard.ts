type Entity = {
  position: { x: number; y: number };
  moment: { x: number; y: number };
  speed: number;
  deceleration: number;
  radius: number;
  color: number;
  opacity: number;
  isControllable: boolean;
  isCamera: boolean;
  isVisible: boolean;
  controls: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  };
  isPushable: boolean;
  isRandomlyDashing: boolean;
  isBullet: boolean;
  timeLeft: number;
  canShoot: boolean;
  reload: number;
  reloadTime: number;
};

class Input {
  private entities: Entity[] = [];
  private keys: Record<string, boolean> = {};

  public constructor(entities: Entity[]) {
    this.entities = entities;
  }

  public set(e: KeyboardEvent, state: boolean) {
    this.keys[e.key] = state;
    this.entities[0].controls = {
      up: this.keys["z"],
      left: this.keys["q"],
      down: this.keys["s"],
      right: this.keys["d"],
    };
  }
}

type InputSetter = (e: KeyboardEvent, state: boolean) => void;

function newInputSetter(entities: Entity[]): InputSetter {
  const keys: Record<string, boolean> = {};

  function setInput(e: KeyboardEvent, state: boolean) {
    keys[e.key] = state;
    entities[0].controls = {
      up: keys["z"],
      left: keys["q"],
      down: keys["s"],
      right: keys["d"],
    };
  }

  return setInput;
}

function keydownServer(e: KeyboardEvent) {
  // const buffer = new Uint8Array([e.key.charCodeAt(0), 1])
  // const buffer = new Uint8Array(2)
  // buffer[0] = e.key.charCodeAt(0)
  // buffer[1] = 1
  // websocket.send(buffer)
}

function keyupServer(e: KeyboardEvent) {
  // const buffer = new Uint8Array([e.key.charCodeAt(0), 0])
  // const buffer = new Uint8Array(2)
  // buffer[0] = e.key.charCodeAt(0)
  // buffer[1] = 0
  // websocket.send(buffer)
}

// ---

function newResize(canvas: HTMLCanvasElement) {
  function resize() {
    canvas.width = globalThis.innerWidth;
    canvas.height = globalThis.innerHeight;
  }
  return resize;
}

// export { newInputSetter }
