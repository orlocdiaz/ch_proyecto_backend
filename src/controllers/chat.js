const ChatService = require('../services/chat');

class ChatController {
  //* USER CONNECTED
  userConnected = async (socket, user) => {
    socket.broadcast.emit('S-userConn', user);
  };

  //* GET MESSAGES
  getMessages = async (socket) => {
    const messages = await ChatService.get();
    if (messages.length) {
      socket.emit('S-messages', messages);
      return messages;
    }
  };

  //* ADD MESSAGE
  addMessage = async (socket, message) => {
    await ChatService.add(message);
    const messages = await this.getMessages(socket);
    socket.broadcast.emit('S-messages', messages);
  };
}

module.exports = new ChatController();
