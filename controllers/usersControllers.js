const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const errorMessages = require("../utils/errorMessages");
const successMessages = require("../utils/successMessages");
const generatePassword = require("generate-password");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExists = await User.findOne({ email: email });

    if (isUserExists) {
      return res.status(400).json({ message: errorMessages.user.emailExists });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      role: "user",
    });

    await newUser.save();

    const token = jsonwebtoken.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      ok: true,
      message: successMessages.user.created,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token: token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `${errorMessages.general.serverError}: ${err}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const userID = req.user.id;

    const keys = Object.keys(req.body);

    if (keys.length == 0) {
      return res
        .status(400)
        .json({ message: "Update request must include at least one field." });
    }

    if (keys.includes("name")) {
      if (req.body.name.length < 3) {
        return res.status(400).json({ message: errorMessages.user.name });
      }
    }

    if (keys.includes("password")) {
      if (req.body.password.length < 6) {
        return res.status(400).json({ message: errorMessages.user.password });
      }
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    if (keys.includes("email")) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(req.body.email)) {
        return res.status(400).json({ message: errorMessages.user.email });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { ...req.body },
      { new: true }
    );

    res.status(202).json({
      ok: true,
      message: successMessages.user.updated,
      user: updatedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `${errorMessages.general.serverError}: ${err}` });
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: errorMessages.user.notFound });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "wrong password" });
    }

    const token = jsonwebtoken.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      ok: true,
      message: successMessages.auth.loggedIn,
      user: { name: user.name, email: user.email },
      token: token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `${errorMessages.general.serverError}: ${err}` });
  }
};

const getUserData = async (req, res) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json({ message: successMessages.auth.loggedIn, user: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: `${errorMessages.general.serverError}: ${err}` });
  }
};

const resetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(req.body.email)) {
      return res.status(400).json({ message: errorMessages.user.email });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: errorMessages.user.notFound });
    }

    const resetCode = generatePassword.generate({
      length: 4,
      numbers: true,
      uppercase: false,
      lowercase: false,
      symbols: false,
      strict: false,
    });

    const resetPasswordToken = jsonwebtoken.sign(
      { id: user._id, email: user.email, resetCode: resetCode },
      process.env.JWT_SECRET,
      { expiresIn: "3m" }
    );

    res
      .status(201)
      .json({ ok: true, token: resetPasswordToken, resetCode: resetCode });
  } catch (err) {
    res
      .status(500)
      .json({ message: `${errorMessages.general.serverError}: ${err}` });
  }
};

const checkRestPasswordCode = async (req, res) => {
  try {
    const userCode = req.body.code;
    const code = req.user.resetCode;

    if (!userCode) {
      return res.status(400).json({ messgae: "you have enter the code " });
    }

    if (userCode !== code) {
      return res.status(400).json({ message: "invalid code" });
    }

    res.status(200).json({
      ok: true,
      message: "valid code",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `${errorMessages.general.serverError}: ${err}` });
  }
};

module.exports = {
  register,
  updateUser,
  logInUser,
  getUserData,
  resetPasswordCode,
  checkRestPasswordCode,
};
