import mongoose, { Schema } from "mongoose";

// Task Schema
const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  isDaily: { type: Boolean, default: false }, // Recurring daily task
  isSpecial: { type: Boolean, default: false }, // Marked as special
  status: {
    type: String,
    enum: ["PENDING", "IN PROGRESS", "COMPLETED", "BACKLOG"],
    default: "PENDING",
  },
  type: {
    type: String,
    enum: ["TEAM", "PERSONAL"],
    required: true,
    default: "PERSONAL",
  }, // Task type
  points: { type: Number, default: 0 }, // Gamification points
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "MEDIUM",
  },
  deadline: { type: Date }, // Task deadline
  access: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      permission: { type: String, enum: ["VIEW", "EDIT"], default: "VIEW" },
    },
  ],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  subtasks: [
    {
      title: { type: String, required: true },
      isCompleted: { type: Boolean, default: false },
    },
  ],
  tags: [{ type: String }], // Tags for categorization
  creator: { type: Schema.Types.ObjectId, ref: "User" }, // Task creator
  team: { type: Schema.Types.ObjectId, ref: "Team" }, // Linked team (for team tasks)
  googleCalendarEventId: { type: String }, // Google Calendar event ID for syncing
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model("Task", TaskSchema);
