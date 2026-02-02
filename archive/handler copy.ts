type Direction = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

abstract class Handler {
  private static sockets: WebSocket[] /* Read Write */
  private static directions: Direction[] /* Write */

  public static setSockets(sockets: WebSocket[]) {
    Handler.sockets = sockets
  }

  public static setDirections(directions: Direction[]) {
    Handler.directions = directions
  }

  public static handler(socket: WebSocket) {
    // const connectionId = crypto.randomUUID()
    // console.log(connectionId)

    // ---
    socket.onopen = () => {
      const nbSockets = Handler.sockets.length
      console.log(`[websocket] ${nbSockets} connected.`)
    }
    socket.onmessage = (event: MessageEvent<any>) => {
      // console.log(connectionId)

      // ---
      // Move onmessage handler from here.

      if (typeof event.data === 'string') {
        const inputs: Direction = JSON.parse(event.data)
        const i = Handler.sockets.indexOf(socket)

        if (i === -1) {
          // Seems like it's possible to receive a message from a socket that is not in the sockets list.
          return
        }
        Handler.directions[i].up = inputs.up || false
        Handler.directions[i].left = inputs.left || false
        Handler.directions[i].down = inputs.down || false
        Handler.directions[i].right = inputs.right || false
      }

      if (event.data instanceof ArrayBuffer) {
        const bytes = new Uint8Array(event.data)
        const data = Array.from(bytes)
        const char = String.fromCharCode(data[0])
        const state = Boolean(data[1])

        // if (char === 'z') {
        //   globalEntities[0][0].controls.up = state
        // }
        // if (char === 'q') {
        //   globalEntities[0][0].controls.left = state
        // }
        // if (char === 's') {
        //   globalEntities[0][0].controls.down = state
        // }
        // if (char === 'd') {
        //   globalEntities[0][0].controls.right = state
        // }

        // globalEntities[0][0].controls = {
        //   up: this.keys['z'],
        //   left: this.keys['q'],
        //   down: this.keys['s'],
        //   right: this.keys['d'],
        // }
      }
      // ---
    }
    socket.onclose = () => {
      // Factorize with onerror
      // ---
      // Remove socket from sockets list
      // Handler.sockets.delete(socket)
      const index = Handler.sockets.indexOf(socket)
      if (index !== -1) {
        // This should never happen
      }
      Handler.sockets.splice(index, 1)
      Handler.directions.splice(index, 1)
      // ---

      const nbSockets = Handler.sockets.length
      console.log(`[websocket] ${nbSockets} connected.`)
    }
    socket.onerror = (error) => {
      console.log(`[websocket] error (${error})`)

      // On client socket error, it messes the connection order or something like that. Looks like it sometimes happens when reloading the client.

      // ---
      // Remove socket from sockets list
      // Handler.sockets.delete(socket)
      const index = Handler.sockets.indexOf(socket)
      if (index !== -1) {
        // This should never happen
      }
      Handler.sockets.splice(index, 1)
      Handler.directions.splice(index, 1)
      // ---

      const nbSockets = Handler.sockets.length
      console.log(`[websocket] ${nbSockets} connected.`)
    }
    Handler.sockets.push(socket)
    // ---

    // ---
    const directions = { up: false, left: false, down: false, right: false }
    Handler.directions.push({ ...directions })
    // ---
  }
}

export { Handler }
