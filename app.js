const express = require("express");
const app = express();
const connectDB = require("../config/db");
const userRoute = require("../routes/usersRoute");
const adminRoute = require("../routes/adminRoute");
require("dotenv").config();
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/users", userRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Home Page" });
});

connectDB();

app.listen(process.env.PORT || 3000);
