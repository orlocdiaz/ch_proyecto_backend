const { Router } = require('express');
const tryCatch = require('../utils/tryCatch');
const CartsController = require('../controllers/cart');

const cartsRouter = Router();

cartsRouter.get('/:cid', tryCatch(CartsController.getCart));
cartsRouter.post('/', tryCatch(CartsController.addCart));
cartsRouter.post('/:cid', CartsController.addToCart);
// cartsRouter.put('/:pid', tryCatch(CartsController.updateProduct));
cartsRouter.delete('/:cid/products/:pid', tryCatch(CartsController.removeFromCart));
cartsRouter.delete('/:cid', tryCatch(CartsController.deleteCart));

module.exports = cartsRouter;
