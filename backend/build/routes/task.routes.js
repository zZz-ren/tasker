"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var taskControllers_1 = __importDefault(require("../controllers/taskControllers"));
var authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
var router = (0, express_1.Router)();
router.get("/get-task/", authenticate_middleware_1.authenticateToken, taskControllers_1.default.getPersonalTasks);
router.get("/get-team-task/:teamId", authenticate_middleware_1.authenticateToken, taskControllers_1.default.getTeamTasks);
router.get("/get-personal-task/:userId", authenticate_middleware_1.authenticateToken, taskControllers_1.default.getPersonalTasks);
router.post("/create", authenticate_middleware_1.authenticateToken, taskControllers_1.default.createTask);
router.post("/update", authenticate_middleware_1.authenticateToken, taskControllers_1.default.updateTask);
router.post("/delete", authenticate_middleware_1.authenticateToken, taskControllers_1.default.deleteTask);
router.post("/change-status", authenticate_middleware_1.authenticateToken, taskControllers_1.default.changeTaskStatus);
exports.default = router;
