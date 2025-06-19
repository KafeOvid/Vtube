import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017";
    const connectionInstance = await mongoose.connect(`${mongoURI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`[MongoDB] ✅ Connected at ${connectionInstance.connection.host}:${connectionInstance.connection.port}/${DB_NAME}`);
  } catch (error) {
    console.error("[MongoDB] ❌ Connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
