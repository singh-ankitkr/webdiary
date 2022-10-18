import dotenv from "dotenv";
import app from "./src/app";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";

const connectToDb = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Successfully connected to MongoDb");
  } catch (err) {
    console.log(`Failure in connecting to mongodb ${err}`);
    process.exit();
  }
};

app.listen(PORT, () => {
  connectToDb().then(() => {
    console.log(`App running on port ${PORT}`);
  });
});
