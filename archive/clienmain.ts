function main() {
  const websocket = new WebSocket('ws://localhost:8443')

  let nbQueries = 0

  websocket.onmessage = () => {
    nbQueries += 1
  }

  const update = () => {
    console.log(nbQueries)
    nbQueries = 0

    globalThis.requestAnimationFrame(update)
  }

  globalThis.requestAnimationFrame(update)
}

export { main }
