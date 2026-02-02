type Direction = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

// type UUID = `${string}-${string}-${string}-${string}-${string}`

abstract class Handler {
  private static sockets: Set<WebSocket> /* Read Write */

  private static directions: Set<Direction> /* Read Write */

  private static permissions: Map<WebSocket, any> /* Read Write */

  public static setSockets(sockets: Set<WebSocket>) {
    Handler.sockets = sockets
  }

  public static setDirections(directions: Set<Direction>) {
    Handler.directions = directions
  }

  public static setPermissions(permissions: Map<WebSocket, any>) {
    Handler.permissions = permissions
  }

  public static handler(socket: WebSocket) {
    // const connectionId = crypto.randomUUID()

    const directions = { up: false, left: false, down: false, right: false }

    // ---
    socket.onopen = () => {
      Handler.sockets.add(socket)

      Handler.directions.add(directions)

      // Handler.permissions

      console.log(`[websocket] ${Handler.sockets.size} connected.`)
    }
    socket.onmessage = (event: MessageEvent<any>) => {
      // ---
      // Move onmessage handler from here.

      if (typeof event.data === 'string') {
        const inputs: Direction = JSON.parse(event.data)

        directions.up = inputs.up || false
        directions.left = inputs.left || false
        directions.down = inputs.down || false
        directions.right = inputs.right || false
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
      Handler.sockets.delete(socket)

      Handler.directions.delete(directions)

      console.log(`[websocket] ${Handler.sockets.size} connected.`)
    }
    socket.onerror = (event) => {
      const err = (event as ErrorEvent).error

      if (err instanceof Error) {
        if (err.stack) {
          console.error(`[websocket] ${err.stack}`)
          return
        }

        console.error(`[websocket] ${err}`)
        return
      }

      console.error(`[websocket] ${event}`)
    }
  }
}

export { Handler }
