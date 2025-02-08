import jwt from "jsonwebtoken";
import { generateToken } from "../utils/lib";
import passport from "../utils/passport";
import { Request, Response } from "express";
import { User } from "../models/User.model";
import { Task } from "../models/Task.model";
import { Team } from "../models/Team.model";

class chartController {
  getChartsData = async (req: Request, res: Response) => {
    try {
      // const { teamId } = req.body;
      const user: any = req.user;
      // if (!teamId) throw new Error("TeamId not specified");
      let users = await User.findOne({ _id: user.id });

      //using mongodb pipeline affrefation
      // let taskStatusData = await Task.aggregate([
      //   { $match: { creator: user.id } },
      //   { $group: { _id: "$status", count: { $sum: 1 } } },
      //   { $project: { _id: 0, name: "$_id", value: "$count" } },
      // ]);

      const tasks = await Task.find({ creator: user.id });
      const teams = await Team.find({members:user.id})


      res.json({
        success: true,
        message: "users fetched successfully",
        tasks,
        teams
      });
    } catch (error) {
      console.error("Error during fetching Users: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
}

export default new chartController();
