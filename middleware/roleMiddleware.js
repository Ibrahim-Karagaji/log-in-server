const errorMessages = require("../utils/errorMessages");
const roleMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: errorMessages.auth.forbidden });
  }
  next();
};

module.exports = roleMiddleware;
