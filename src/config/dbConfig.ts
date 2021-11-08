import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUri = process.env.MONGO_URI || "";
  console.log(dbUri);
  try {
    await mongoose.connect(dbUri);
    console.log("Mongo DB connected ...");
  } catch (err: any) {
    console.error("error is", err.message);
    process.exit(1);
  }
};
