import jwt from "jsonwebtoken";
import { generateToken } from "../utils/lib";
import passport from "../utils/passport";
import { Request, Response } from "express";
import { User } from "../models/User.model";

class authController {
  logout = (req: Request, res: Response) => {
    try {
      res.cookie("jwttoken", "", { maxAge: 0 });
      res.status(200).json({
        message: "Logged out Successfully",
        success: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else
        res
          .status(400)
          .json({ error: "Internal Server Error ", status: false });
    }
  };
  googleCallback = (req: Request, res: Response) => {
    try {
      // User is authenticated at this point
      const user = req.user; // Access authenticated user object
      const token = generateToken(user);
      res.cookie("jwttoken", token, {
        httpOnly: true,
        sameSite: "strict",
      });

      // Respond with a success message or redirect to the desired page
      res.redirect(
        process.env.MODE == "development"
          ? process.env.CLIENT_URL || "http://localhost:5173/"
          : "/"
      );
    } catch (error) {
      console.error("Error during Google callback:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  checkAuth = async (req: Request, res: Response) => {
    try {
      const currUser = req.user as any;

      const user = await User.findOne({ _id: currUser.id }).populate("teams");

      user && console.log(user.teams[0]);

      // If JWT token is valid, respond with success message
      res.json({ success: true, message: "Authenticated", user: user });
    } catch (error) {
      console.error("Error during Checking AuthState: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      // const { teamId } = req.body;
      const user: any = req.user;
      // if (!teamId) throw new Error("TeamId not specified");
      let users = await User.find();
      users = users.filter((usr) => usr._id.toString() != user.id);

      res.json({ success: true, users, message: "users fetched successfully" });
    } catch (error) {
      console.error("Error during fetching Users: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
}

export default new authController();
