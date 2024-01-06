const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true,
  },
  password: {
      type: String,
      required: true,
  },
  loginAttempts: {
      type: Number,
      default: 0,
  },
  userType: {
      type: String,
      default: "student",
  },
});

const User = mongoose.model('User', userSchema)
module.exports = User;
