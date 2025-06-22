const errorMessages = require("../utils/errorMessages");

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name , email and password are required" });
  }

  if (typeof name != "string" || name.length < 3) {
    return res.status(400).json({ message: errorMessages.user.name });
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return res.status(400).json({ message: errorMessages.user.email });
  }

  if (typeof password != "string" || password.length < 6) {
    return res.status(400).json({ message: errorMessages.user.password });
  }
  next();
};

module.exports = validateUser;
