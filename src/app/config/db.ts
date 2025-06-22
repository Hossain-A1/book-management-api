import mongoose from "mongoose";

const connectDB = async (option = {}) => {
  try {
    const uri = process.env.MONGO_URI as string;

    await mongoose.connect(uri, option);
    console.log("Connection to DB is successfull established");

    mongoose.connection.on("Error", (error) => {
      console.log(`Db connection error ${error}`);
    });
  } catch (error) {
    console.log(`could not connect ${error as string}`);
  }
};

export default connectDB;
