"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generate JWT
var generateToken = function (user) {
    var payload = {
        id: user._id,
        email: user.email,
        avatar: user.avatar,
        name: user.name,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
