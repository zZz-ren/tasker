import { Router } from "express";
import teamController from "../controllers/teamControllers";
import { authenticateToken } from "../middlewares/authenticate.middleware";

const router = Router();

router.get("/get-all-team", authenticateToken, teamController.getAllTeams);
router.post("/create", authenticateToken, teamController.createTeam);
router.post("/update", authenticateToken, teamController.updateTeam);
router.post("/delete", authenticateToken, teamController.deleteTask);



export default router;
