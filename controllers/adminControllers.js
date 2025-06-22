const User = require("../models/Users");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const errorMessages = require("../utils/errorMessages");
const successMessages = require("../utils/successMessages");

const logInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(403).json({ message: errorMessages.user.notFound });
    }

    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "wrong password" });
    }

    const token = jsonwebtoken.sign(
      { id: admin._id, name: admin.name, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      ok: true,
      message: successMessages.auth.loggedIn,
      token: token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `${errorMessages.general.serverError}: ${err}` });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      ok: true,
      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      })),
    });
  } catch (err) {
    res.status(500).json({
      message: `${errorMessages.general.serverError}: ${err}`,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: "User ID is required" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      return res
        .status(200)
        .json({ ok: true, message: successMessages.user.deleted, user: user });
    } else {
      return res.status(404).json({ message: errorMessages.user.notFound });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: `${errorMessages.general.serverError}: ${err}` });
  }
};

module.exports = { logInAdmin, getAllUsers, deleteUser };
