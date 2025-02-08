"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("../utils/passport"));
var authControllers_1 = __importDefault(require("../controllers/authControllers"));
var authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
var router = (0, express_1.Router)();
router.get("/checkAuth", authenticate_middleware_1.authenticateToken, authControllers_1.default.checkAuth);
router.get("/logout", authenticate_middleware_1.authenticateToken, authControllers_1.default.logout);
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), authControllers_1.default.googleCallback);
router.get('/users', authenticate_middleware_1.authenticateToken, authControllers_1.default.getAllUsers);
exports.default = router;
