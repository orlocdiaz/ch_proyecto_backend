const { Server } = require('socket.io');
const chatSocket = require('../sockets/chat');
const productsSocket = require('../sockets/products');

function SocketConfig(server) {
  const io = new Server(server);
  chatSocket(io);
  productsSocket(io);
}

module.exports = SocketConfig;
