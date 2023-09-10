const UsersService = require("../services/users");
const Manager = require("../utils/manager");
const MyError = require("../utils/myError");

class UsersController {
  constructor() {
    this.manager = new Manager(UsersService);
  }

  getUser = async (req, res) => {
    const { email, password } = req.query;
    try {
      const user = await this.manager.getFound({ email, password });
      req.session.user = user.email;
      req.session.password = user.password;
      req.session.name = user.firstName;
      req.session.role = user.role;
      res
        .status(200)
        .json({ status: "OK", message: "User logged in successfully!" });
    } catch (error) {
      throw new MyError(
        404,
        "Invalid Credentials",
        "User or password incrrect! Try again."
      );
    }
  };

  addUser = async (req, res) => {
    const user = req.body;
    const newUser = await this.manager.add(user);

    res
      .status(200)
      .json({ status: "OK", message: "User registered successfully!" });
    return newUser;
  };
}

module.exports = new UsersController();
