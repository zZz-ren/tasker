"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var teamControllers_1 = __importDefault(require("../controllers/teamControllers"));
var authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
var router = (0, express_1.Router)();
router.get("/get-all-team", authenticate_middleware_1.authenticateToken, teamControllers_1.default.getAllTeams);
router.post("/create", authenticate_middleware_1.authenticateToken, teamControllers_1.default.createTeam);
router.post("/update", authenticate_middleware_1.authenticateToken, teamControllers_1.default.updateTeam);
router.post("/delete", authenticate_middleware_1.authenticateToken, teamControllers_1.default.deleteTask);
exports.default = router;
