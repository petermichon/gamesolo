import { Server } from 'socket.io'

function main() {
  const io = new Server({})

  io.on('connection', (socket) => {
    console.log('test')
  })

  io.listen(3000)
}

export { main }
