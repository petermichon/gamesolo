function main() {
  if (!('WebSocketStream' in self)) {
    console.log('Your browser does not support WebSocketStream')
  }

  let nbQueries = 0

  const wss = new WebSocketStream('ws://127.0.0.1:8443/')

  const a = async () => {
    const { readable, writable, extensions, protocol } = await wss.opened
    console.log('[websocket] connected.')
    const reader = readable.getReader()
    // const writer = writable.getWriter()

    // console.log(nbQueries)
    const update = async () => {
      const { value, done } = await reader.read()

      nbQueries += 1
      console.log(nbQueries)
      nbQueries = 0

      globalThis.requestAnimationFrame(update)
      // globalThis.queueMicrotask(() => {
      //   globalThis.requestAnimationFrame(update)
      // })
    }

    globalThis.requestAnimationFrame(update)
  }
  a()

  wss.closed.then((result: any) => {
    console.log(
      `DISCONNECTED: code ${result.closeCode}, message "${result.reason}"`
    )
    console.log('Socket closed', result.closeCode, result.reason)
  })
}

// function main() {
//   let nbQueries = 0

//   const websocket = new WebSocket('ws://localhost:8443/')

//   websocket.onmessage = () => {
//     nbQueries += 1
//     // globalThis.queueMicrotask(() => {
//     //   nbQueries += 1
//     // })
//     globalThis.requestAnimationFrame(update)
//   }

//   const update = () => {
//     console.log(nbQueries)
//     nbQueries = 0

//     // globalThis.requestAnimationFrame(update)
//     // globalThis.queueMicrotask(() => {
//     //   globalThis.requestAnimationFrame(update)
//     // })
//   }

//   // globalThis.requestAnimationFrame(update)
// }

export { main }
