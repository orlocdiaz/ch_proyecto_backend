const mongoose = require("mongoose");

const userCollection = "users";
const roles = ["user", "admin", "superAdmin"];

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: roles,
    default: "user",
  },
});

const User = mongoose.model(userCollection, userSchema);

module.exports = User;
