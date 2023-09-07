const { Router } = require('express');
const tryCatch = require('../utils/tryCatch');
const ViewsController = require('../controllers/views');

const viewsRouter = Router();

viewsRouter.get('/', tryCatch(ViewsController.renderHome));
viewsRouter.get('/home', tryCatch(ViewsController.renderHome));
viewsRouter.get('/products', tryCatch(ViewsController.renderProducts));
viewsRouter.get('/cart/:cid', tryCatch(ViewsController.renderCart));

module.exports = viewsRouter;
