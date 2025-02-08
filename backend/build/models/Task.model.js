"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var mongoose_1 = __importStar(require("mongoose"));
// Task Schema
var TaskSchema = new mongoose_1.Schema({
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
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            permission: { type: String, enum: ["VIEW", "EDIT"], default: "VIEW" },
        },
    ],
    comments: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
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
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }, // Task creator
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: "Team" }, // Linked team (for team tasks)
    googleCalendarEventId: { type: String }, // Google Calendar event ID for syncing
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.Task = mongoose_1.default.model("Task", TaskSchema);
