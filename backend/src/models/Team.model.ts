import mongoose, { Schema } from "mongoose";
import { User } from "./User.model";

// Team Schema
const TeamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  creator: {type: Schema.Types.ObjectId,ref:"User"},
  members: [{ type: Schema.Types.ObjectId, ref:"User" }], // User IDs of team members
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Team = mongoose.model("Team", TeamSchema);
