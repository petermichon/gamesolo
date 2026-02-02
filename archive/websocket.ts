let websocket: WebSocket;

const server: { entities: any } = {
  entities: [],
};

function newWsConnection() {
  const wsUri = "ws://localhost:8443";

  websocket = new WebSocket(wsUri);

  websocket.onopen = onopen;

  websocket.onclose = onclose;

  websocket.onmessage = onmessage;

  websocket.onerror = onerror;
}

function onopen(event: Event) {
  console.log("CONNECTED");
}

function onmessage(e: MessageEvent<any>) {
  const json = JSON.parse(e.data);
  server.entities = json;
}

// // Also sync client entities
// const copy = JSON.parse(e.data)
// clientEntities = copy
// clientEntities[0].controls = {
//   up: false,
//   left: false,
//   down: false,
//   right: false,
// }

function onclose(e: CloseEvent) {
  console.log(`DISCONNECTED: Code ${e.code}`);
  if (e.code === 1006) {
    console.log("reconnecting...");
    globalThis.setTimeout(newWsConnection, 100);
  }
}

function onerror(e: Event) {
  console.log(`ERROR`);
}

// export { newWsConnection, server, websocket }
