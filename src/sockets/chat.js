const ChatController = require('../controllers/chat');
const ChatService = require('../services/chat');
const Manager = require('../utils/manager');

const manager = new Manager(ChatService);

function chatSocket(io) {
  io.of('/chat').on('connection', (socket) => {
    socket.emit('S-login');

    socket.on('C-loggedIn', async (user) => {
      socket.broadcast.emit('S-userConn', user);
      try {
        const messages = await manager.getAll();
        socket.emit('S-messages', messages);
      } catch (error) {
        socket.emit('S-NewChat');
      }
    });

    socket.on('C-message', async (message) => {
      try {
        await manager.add(message);
        const messages = await manager.getAll();
        socket.emit('S-messages', messages);
        socket.broadcast.emit('S-messages', messages);
      } catch (error) {
        socket.emit('S-NewChat');
      }
    });
  });
}

module.exports = chatSocket;
