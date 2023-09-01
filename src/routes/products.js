const { Router } = require('express');
const tryCatch = require('../utils/tryCatch');
const ProductsController = require('../controllers/products');

const productsRouter = Router();

productsRouter.get('/', tryCatch(ProductsController.getProducts));
productsRouter.get('/:id', tryCatch(ProductsController.getProductById));
productsRouter.post('/', tryCatch(ProductsController.addProduct));
productsRouter.put('/:pid', tryCatch(ProductsController.updateProduct));
productsRouter.delete('/:pid', tryCatch(ProductsController.deleteProduct));

module.exports = productsRouter;
