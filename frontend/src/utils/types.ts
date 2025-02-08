import { UserState } from "../Store/slices/userSlice";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  isDaily: boolean; // Recurring daily task
  isSpecial: boolean; // Marked as special
  status: "PENDING" | "IN PROGRESS" | "BACKLOG" | "COMPLETED"; // Task type
  type: "TEAM" | "PERSONAL"; // Task type
  points: number; // Gamification points
  priority: "LOW" | "MEDIUM" | "HIGH"; // Task priority
  deadline: string; // Task deadline
  access: Access[]; // Access permissions
  comments: Comment[]; // Task comments
  subtasks: Subtask[]; // Subtasks
  tags: string[]; // Tags for categorization
  creator: ""; // User ID of the creator
  team?: string; // Team ID for team tasks
  googleCalendarEventId?: string; // Google Calendar event ID for syncing
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Update timestamp
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  creator: string;
  members: UserState[];
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Update timestamp
}

export interface Access {
  user: string; // User ID
  permission: "VIEW" | "EDIT"; // Permission type
}

export interface Comment {
  user: string; // User ID
  content: string; // Comment content
  createdAt: Date; // Comment timestamp
}

export interface Subtask {
  title: string; // Subtask title
  isCompleted: boolean; // Completion status
}
