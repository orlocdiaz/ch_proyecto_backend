const ProductsService = require('../services/products');

function productsSocket(io) {
  io.of('/products').on('connection', async (socket) => {
    const products = await ProductsService.get();
    socket.emit('S-Get', products);
  });
}

module.exports = productsSocket;
