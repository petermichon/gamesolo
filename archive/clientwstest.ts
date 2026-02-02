function main() {
  let state = false

  const websocket = new WebSocket('ws://localhost:8443')

  websocket.binaryType = 'arraybuffer'

  websocket.onmessage = () => {
    state = true
  }

  const update = () => {
    console.log(state)
    state = false

    globalThis.requestAnimationFrame(update)
  }

  globalThis.requestAnimationFrame(update)
}

export { main }
