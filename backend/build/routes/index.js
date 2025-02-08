"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
var express_1 = require("express");
var AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
var task_routes_1 = __importDefault(require("./task.routes"));
var team_routes_1 = __importDefault(require("./team.routes"));
var chart_routes_1 = __importDefault(require("./chart.routes"));
var defaultRouter = (0, express_1.Router)();
exports.defaultRouter = defaultRouter;
defaultRouter.use("/auth", AuthRoutes_1.default);
defaultRouter.use("/task", task_routes_1.default);
defaultRouter.use("/team", team_routes_1.default);
defaultRouter.use("/chart", chart_routes_1.default);
