import { Router } from "express";
import chartController from "../controllers/chartControllers";
import { authenticateToken } from "../middlewares/authenticate.middleware";

const router = Router();

router.get("/data", authenticateToken, chartController.getChartsData);

export default router;
