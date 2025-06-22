import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";
async function main() {
  try {
    const uri = process.env.MONGO_URI as string;
    const PORT = process.env.PORT || 4000;

   await mongoose.connect(uri);
    console.log("Db connected");
     app.listen(PORT, () => {
      console.log(`App is listing on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
