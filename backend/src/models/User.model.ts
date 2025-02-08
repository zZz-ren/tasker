import mongoose, { Schema } from "mongoose";
import { Team } from "./Team.model";

// User Schema
const UserSchema = new Schema({
  googleId: { type: String, required: true, unique: true }, // Google OAuth ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String }, // Profile picture URL from Google
  teams: [{ type: Schema.Types.ObjectId, ref: Team }], // Teams the user belongs to
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", UserSchema);
