import ChatSocket from './chat'
export default class Socket {
  constructor (io) {
    this.io = io
    io.on('connection', async (socket) => {
      this.socket = socket
      console.log(`${socket.id}成功连接服务器`)
      new ChatSocket(io, socket)
    })
  }
}