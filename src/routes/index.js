const { Router } = require('express');
const productsRouter = require('./products');
const cartsRouter = require('./cart');
const viewsRouter = require("./views");
const usersRouter = require("./users");
const logoutRouter = require("./logout");

const router = Router();

router.use("/", viewsRouter);
router.use("/logout", logoutRouter);
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/users", usersRouter);

module.exports = router;
