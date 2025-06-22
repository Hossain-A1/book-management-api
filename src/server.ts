import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectDB from "./app/config/db";
async function main() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`App is listing on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// Export the app for Vercel's serverless environment
export default app;
