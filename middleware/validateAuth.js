const errorMessages = require("../utils/errorMessages");
const jsonwebtoken = require("jsonwebtoken");

const validateAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(404).json({ message: errorMessages.auth.unauthorized });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: errorMessages.auth.unauthorized });
  }

  try {
    const info = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = info;
  } catch (err) {
    res.status(400).json({ messgae: err });
  }

  next();
};

module.exports = validateAuth;
