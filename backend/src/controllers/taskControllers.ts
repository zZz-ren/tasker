import jwt from "jsonwebtoken";
import { generateToken } from "../utils/lib";
import passport from "../utils/passport";
import { Request, Response } from "express";
import { Task } from "../models/Task.model";
import mongoose from "mongoose";

class tashController {
  getTeamTasks = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;
      const teamId = req.params.teamId;
      if (!currUser) {
        throw new Error("No user present");
      }

      const task = await Task.find({ team: teamId });
      res.json({
        success: true,
        data: task,
        message: "Task fetched successfully",
      });
    } catch (error) {
      console.error("Error during fetching Tasks :", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  getPersonalTasks = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;
      if (!currUser) {
        throw new Error("No user present");
      }
      if (currUser.id != req.params.userId) {
        throw new Error("Access Denied Not Public Data")
      }

      const task = await Task.find({ creator: currUser.id, type: "PERSONAL" })
      res.json({
        success: true,
        data: task,
        message: "Tasks fetched successfully",
      });
    } catch (error) {
      console.error("Error during fetching Tasks :", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  createTask = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;
      const {
        title,
        description,
        isDaily,
        isSpecial,
        priority,
        points,
        deadline,
        type,
        team,
        access,
        subtasks,
        status,
      } = req.body;

      // Validate required fields
      if (!title || !description || !priority) {
        throw new Error("Missing required fields");
      }

      // Create new task
      const newTask = new Task({
        title,
        description,
        deadline: new Date(deadline), // Convert to Date
        isDaily,
        isSpecial,
        creator: currUser.id, // Associate task with the user
        points,
        status,
        type,
        team,
        access,
        subtasks,
      });

      // Save to database
      await newTask.save();

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: newTask,
      });
    } catch (error) {
      console.error("Error during creating", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  updateTask = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;
      var {
        _id,
        title,
        description,
        isDaily,
        isSpecial,
        priority,
        points,
        deadline,
        type,
        team,
        access,
        subtasks,
        status,
      } = req.body;

      // Validate required fields
      if (!title || !description || !priority) {
        throw new Error("Missing required fields");
      }

      // Create new task
      const updatedTask = await Task.updateOne(
        { _id },
        { ...req.body, deadline: new Date(deadline) },
        {
          new: true,
        }
      );

      res.status(201).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
      });
    } catch (error) {
      console.error("Error during creating", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  deleteTask = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;
      const { taskId } = req.body;
      let result;
      // Validate required fields
      if (typeof taskId === "string") {
        result = await Task.deleteOne({ _id: taskId, creator: currUser.id });
      } else {
        result = await Promise.allSettled(
          taskId.map(async (id: string) => {
            if (id) await Task.deleteOne({ _id: id, creator: currUser.id });
          })
        );
      }

      res.status(201).json({
        success: true,
        message: "Tasks deleted successfully",
        data: taskId,
        result,
      });
    } catch (error) {
      console.error("Error during deleting tasks", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  changeTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { taskId, status } = req.body;
      const user: any = req.user;

      const completedTask = await Task.findOneAndUpdate(
        { creator: user.id, _id: taskId },
        { status },
        { new: true }
      );

      res
        .status(200)
        .json({
          success: true,
          message: "Task Status change successful",
          data: completedTask,
        });
    } catch (error: any) {
      console.error("Error in changeTaskStatus:", error.message || error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
}

export default new tashController();
