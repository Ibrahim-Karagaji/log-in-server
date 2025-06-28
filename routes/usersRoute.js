const route = require("express").Router();
const usersControllers = require("../controllers/usersControllers");
const validateUser = require("../middleware/validateUser");
const validateLogin = require("../middleware/validateLogin");
const validateAuth = require("../middleware/validateAuth");
const uploads = require("../middleware/uploadMiddleware");

route.get(
  "/get-user",
  uploads.none(),
  validateAuth,
  usersControllers.getUserData
);
route.post("/", uploads.none(), validateUser, usersControllers.register);
route.put(
  "/",
  uploads.single("userLogo"),
  validateAuth,
  usersControllers.updateUser
);
route.post(
  "/log-in",
  uploads.none(),
  validateLogin,
  usersControllers.logInUser
);
route.post(
  "/reset-password-code",
  uploads.none(),
  usersControllers.resetPasswordCode
);
route.post(
  "/check-reset-password-code",
  uploads.none(),
  validateAuth,
  usersControllers.checkRestPasswordCode
);

module.exports = route;
