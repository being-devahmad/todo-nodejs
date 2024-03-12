// connection to database

require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectDb;