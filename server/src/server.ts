import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectDB from "./app/config/db";

async function main() {
  try {
    const PORT = process.env.PORT || 4000;

    await connectDB();
    // await connectDB();
    app.listen(PORT, () => {
      console.log(`App is listing on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
