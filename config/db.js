const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB has connected successfully");
  } catch (err) {
    console.log(`DB has not connected successfully ${err}`);
  }
};

module.exports = connect;
