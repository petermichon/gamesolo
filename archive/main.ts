const socketWrapper: { value: WebSocket | undefined } = { value: undefined }

const fps = 60
const frameTime = 1000 / fps // ~16.67ms per frame
let lastTime = performance.now()

function main() {
  const loop = () => {
    const now = performance.now()
    const deltaTime = now - lastTime

    if (deltaTime >= frameTime) {
      if (socketWrapper.value) {
        const socket = socketWrapper.value
        if (socket.readyState === WebSocket.OPEN) {
          socket.send('A')
        }
      }

      lastTime = now - (deltaTime % frameTime)
    }

    setTimeout(loop, Math.max(0, frameTime - deltaTime))
  }
  loop()

  Deno.serve({
    port: 8443,
    handler: (request: Request) => {
      const { socket, response } = Deno.upgradeWebSocket(request)
      socketWrapper.value = socket
      return response
    },
  })
}

export { main }
