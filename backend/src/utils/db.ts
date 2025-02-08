import mongoose from "mongoose";
import { Team } from "../models/Team.model";
import { User } from "../models/User.model";

export const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      let con = await mongoose.connect(mongoUri);
      console.log("MongoDB connected:", con.connection.host);
    }
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};
