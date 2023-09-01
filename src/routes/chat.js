const { Router } = require('express');
const tryCatch = require('../utils/tryCatch');
const ViewsController = require('../controllers/views');

const chatRouter = Router();

chatRouter.get('/', tryCatch(ViewsController.renderChat));

module.exports = chatRouter;
