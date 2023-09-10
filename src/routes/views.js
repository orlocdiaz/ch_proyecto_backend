const { Router } = require('express');
const tryCatch = require('../utils/tryCatch');
const ViewsController = require('../controllers/views');
const sessionAuth = require("../middlewares/sessionAuth");

const viewsRouter = Router();

viewsRouter.get("/", sessionAuth, tryCatch(ViewsController.renderProducts));
viewsRouter.get("/register", tryCatch(ViewsController.renderRegister));
viewsRouter.get(
  "/profile",
  sessionAuth,
  tryCatch(ViewsController.renderProfile)
);
viewsRouter.get(
  "/products",
  sessionAuth,
  tryCatch(ViewsController.renderProducts)
);
viewsRouter.get(
  "/rtproducts",
  sessionAuth,
  tryCatch(ViewsController.renderRTProducts)
);
viewsRouter.get(
  "/cart/:cid",
  sessionAuth,
  tryCatch(ViewsController.renderCart)
);
viewsRouter.get("/chat", sessionAuth, tryCatch(ViewsController.renderChat));

module.exports = viewsRouter;
