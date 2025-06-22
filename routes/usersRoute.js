const route = require("express").Router();
const usersControllers = require("../controllers/usersControllers");
const validateUser = require("../middleware/validateUser");
const validateLogin = require("../middleware/validateLogin");
const validateAuth = require("../middleware/validateAuth");

route.get("/get-user", validateAuth, usersControllers.getUserData);
route.post("/", validateUser, usersControllers.register);
route.put("/", validateAuth, usersControllers.updateUser);
route.post("/log-in", validateLogin, usersControllers.logInUser);
route.post("/reset-password-code", usersControllers.resetPasswordCode);
route.post(
  "/check-reset-password-code",
  validateAuth,
  usersControllers.checkRestPasswordCode
);

module.exports = route;
