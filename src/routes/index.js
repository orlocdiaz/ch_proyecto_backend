const { Router } = require('express');
const productsRouter = require('./products');
const cartsRouter = require('./cart');
const viewsRouter = require('./views');
const chatRouter = require('./chat');

const router = Router();

router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/', viewsRouter);
router.use('/chat', chatRouter);

module.exports = router;
