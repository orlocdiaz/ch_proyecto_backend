const { Router } = require("express");
const tryCatch = require("../utils/tryCatch");

const logoutRouter = Router();

logoutRouter.get(
  "/",
  tryCatch(async (req, res) => {
    await req.session.destroy();
    res.render("login");
  })
);

module.exports = logoutRouter;
