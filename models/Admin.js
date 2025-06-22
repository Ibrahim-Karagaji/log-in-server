const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
