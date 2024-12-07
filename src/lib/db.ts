import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("MONGODB_URL not found!");
  if (isConnected) return console.log("Already connected to MongoDB!");

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log("Cnected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectDB;
