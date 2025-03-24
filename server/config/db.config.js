import { connect } from "mongoose";
const connectDB = () => {
  try {
    connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
