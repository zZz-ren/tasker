import { Request, Response } from "express";
import { Task } from "../models/Task.model";
import { Team } from "../models/Team.model";

class teamController {
  getAllTeams = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;

      if (!currUser) {
        throw new Error("No user present");
      }

      const teams = await Team.find({ members: currUser.id }).populate(
        "members"
      );
      res.json({
        success: true,
        data: teams,
        message: "Team fetched successfully",
      });
    } catch (error) {
      console.error("Error during fetching Teams :", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  createTeam = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;
      const { name, description, members } = req.body;
      if (!currUser) {
        throw new Error("No user present");
      }

      const team = await Team.create({
        name,
        description,
        creator: currUser.id,
        members: [...members, currUser.id],
      });
      res.json({
        success: true,
        data: team,
        message: "Team created successfully",
      });
    } catch (error) {
      console.error("Error during creating team :", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  updateTeam = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;
      var { _id, name, description, members } = req.body;

      members = members.map((member: any) => member._id);

      // Validate required fields
      if (!name || !description) {
        throw new Error("Missing required fields");
      }

      // Create new task
      const updatedTeam = await Team.findOneAndUpdate(
        { _id },
        { ...req.body, members },
        {
          new: true,
        }
      ).populate("members");

      res.status(201).json({
        success: true,
        message: "Team updated successfully",
        data: updatedTeam,
      });
    } catch (error) {
      console.error("Error during updating team", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  deleteTask = async (req: Request, res: Response) => {
    try {
      const currUser: any = req.user;
      const { taskIds } = req.body;

      // Validate required fields
      if (taskIds.length <= 0) {
        throw new Error("Missing _id fields");
      }

      const result = await Promise.allSettled(
        taskIds.map(async (id: string) => {
          if (id) await Task.deleteOne({ _id: id, creator: currUser.id });
        })
      );

      res.status(201).json({
        success: true,
        message: "Tasks deleted successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error during deleting tasks", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
}

export default new teamController();
