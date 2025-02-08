import { Router } from "express";
import authRoutes from "./AuthRoutes";
import taskRoutes from "./task.routes";
import teamRoutes from "./team.routes";
import chartRoutes from "./chart.routes";

const defaultRouter = Router();

defaultRouter.use("/auth", authRoutes);
defaultRouter.use("/task", taskRoutes);
defaultRouter.use("/team", teamRoutes);
defaultRouter.use("/chart", chartRoutes);

export { defaultRouter };
