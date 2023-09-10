const { Router } = require("express");
const tryCatch = require("../utils/tryCatch");
const UsersController = require("../controllers/users");

const usersRouter = Router();

usersRouter.get("/login", tryCatch(UsersController.getUser));
usersRouter.post("/register", tryCatch(UsersController.addUser));

module.exports = usersRouter;
