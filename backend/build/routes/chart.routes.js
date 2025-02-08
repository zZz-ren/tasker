"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var chartControllers_1 = __importDefault(require("../controllers/chartControllers"));
var authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
var router = (0, express_1.Router)();
router.get("/data", authenticate_middleware_1.authenticateToken, chartControllers_1.default.getChartsData);
exports.default = router;
