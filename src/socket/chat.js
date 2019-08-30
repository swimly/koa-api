export default class ChatSocket {
  constructor (io, socket) {
    this.io = io;
    this.socket = socket;
    socket.on('sendMsg', async (data) => {
      io.emit('sendMsgBack', data)
    })
  }
}