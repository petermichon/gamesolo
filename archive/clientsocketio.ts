import { io } from 'socket.io-client'

function main() {
  const socket = io('ws://localhost:3000/', {
    transports: ['websocket', 'polling'],
  })

  socket.on('cpu', (cpuPercent) => {
    console.log(cpuPercent)
  })
}

export { main }
