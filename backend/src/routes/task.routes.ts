import { Router } from "express";
import passport from "../utils/passport";
import taskController from "../controllers/taskControllers";
import { authenticateToken } from "../middlewares/authenticate.middleware";
import { Task } from "../models/Task.model";
import { Team } from "../models/Team.model";

const router = Router();

router.get("/get-task/", authenticateToken, taskController.getPersonalTasks);
router.get("/get-team-task/:teamId", authenticateToken, taskController.getTeamTasks);
router.get("/get-personal-task/:userId", authenticateToken, taskController.getPersonalTasks);
router.post("/create", authenticateToken, taskController.createTask);
router.post("/update", authenticateToken, taskController.updateTask);
router.post("/delete", authenticateToken, taskController.deleteTask);
router.post("/change-status", authenticateToken, taskController.changeTaskStatus);



export default router;
