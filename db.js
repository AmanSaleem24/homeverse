import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL);
  console.log("MongoDB connected");
}
