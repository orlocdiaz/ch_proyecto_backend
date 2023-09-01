const { Router } = require('express');
const tryCatch = require('../utils/tryCatch');
const CartsController = require('../controllers/cart');

const cartsRouter = Router();

cartsRouter.get('/:cid', tryCatch(CartsController.getCart));
cartsRouter.post('/', tryCatch(CartsController.addCart));
// cartsRouter.put('/:pid', tryCatch(CartsController.updateProduct));
// cartsRouter.delete('/:pid', tryCatch(CartsController.deleteProduct));

module.exports = cartsRouter;
