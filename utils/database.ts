import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // You can change "strictQuery" to a valid option

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://rebel:7017614925@cluster0.ihexdsa.mongodb.net/energymonitor?retryWrites=true&w=majority"
    );

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
