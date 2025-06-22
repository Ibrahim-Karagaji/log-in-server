const route = require("express").Router();
const adminControllers = require("../controllers/adminControllers");
const validateLogin = require("../middleware/validateLogin");
const validateAuth = require("../middleware/validateAuth");
const roleMiddleware = require("../middleware/roleMiddleware");

route.get("/users", validateAuth, roleMiddleware, adminControllers.getAllUsers);

route.delete(
  "/users/:id",
  validateAuth,
  roleMiddleware,
  adminControllers.deleteUser
);
route.post("/log-in", validateLogin, adminControllers.logInAdmin);

module.exports = route;
