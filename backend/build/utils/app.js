"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.server = exports.io = void 0;
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var socket_io_1 = require("socket.io");
var passport_1 = __importDefault(require("./passport"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("../routes");
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var app = (0, express_1.default)();
exports.app = app;
var FRONTEND_PATH = path_1.default.join(__dirname, "../../../frontend/dist");
app.use((0, cors_1.default)({
    origin: "/",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SECRET || "optional_secret_key_123abc456def789ghi",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60, // 1 month
        secure: process.env.NODE_ENV === "production" ? true : "auto",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
}));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.static(FRONTEND_PATH));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
// app.use("/",);
app.use("/api", routes_1.defaultRouter);
app.use("*", function (req, res) {
    res.status(404).json({ status: false, message: "Route not found" });
});
var server = http_1.default.createServer(app);
exports.server = server;
var io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.MODE == "development" ? "http://localhost:5173/" : "/",
        credentials: true,
    },
});
exports.io = io;
