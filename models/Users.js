const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  userLogo: {
    type: String,
  },
  logoID: {
    type: String,
  },
  verified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationTokenExpires: Date,
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
