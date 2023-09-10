const User = require("../models/User");
const MyError = require("../utils/myError");

class UsersService {
  get = async (findParams, limit, sort) => {
    try {
      if (limit) {
        const data = await User.paginate(findParams, limit);
        return data;
      } else if (findParams) {
        const data = await User.find(findParams).sort(sort).lean();
        return data.length > 1 ? data : data[0];
      } else {
        const data = await User.find().sort(sort).lean();
        return data;
      }
    } catch (error) {
      throw new MyError(
        500,
        "Internal Error",
        error.message || "Unable to get users!"
      );
    }
  };

  add = async (user) => {
    try {
      await User.create(user);
      return user;
    } catch (error) {
      throw new MyError(
        500,
        "Internal Error",
        error.message || "Unable to register user!"
      );
    }
  };
}

module.exports = new UsersService();
