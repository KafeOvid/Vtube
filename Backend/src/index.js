// require("dotenv").config({path: "./.env"});
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";
const app = express();

connectDB().then(() => {
  app.on("error", (err) => {
    console.error("Server error:", err);
  });
  app.listen(process.env.PORT || 8000, () => {
  console.log(`Connected to MongoDB database: ${DB_NAME}`);
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
  });
})
.catch((err) => {
  console.error(`Failed to connect to MongoDB database: ${DB_NAME}`, err);

  process.exit(1);
})