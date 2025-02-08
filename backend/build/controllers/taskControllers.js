"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Task_model_1 = require("../models/Task.model");
var tashController = /** @class */ (function () {
    function tashController() {
        var _this = this;
        this.getTeamTasks = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser, teamId, task, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currUser = req.user;
                        teamId = req.params.teamId;
                        if (!currUser) {
                            throw new Error("No user present");
                        }
                        return [4 /*yield*/, Task_model_1.Task.find({ team: teamId })];
                    case 1:
                        task = _a.sent();
                        res.json({
                            success: true,
                            data: task,
                            message: "Task fetched successfully",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error during fetching Tasks :", error_1);
                        res.status(500).json({
                            success: false,
                            message: "Internal Server Error",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPersonalTasks = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser, task, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currUser = req.user;
                        if (!currUser) {
                            throw new Error("No user present");
                        }
                        if (currUser.id != req.params.userId) {
                            throw new Error("Access Denied Not Public Data");
                        }
                        return [4 /*yield*/, Task_model_1.Task.find({ creator: currUser.id, type: "PERSONAL" })];
                    case 1:
                        task = _a.sent();
                        res.json({
                            success: true,
                            data: task,
                            message: "Tasks fetched successfully",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error during fetching Tasks :", error_2);
                        res.status(500).json({
                            success: false,
                            message: "Internal Server Error",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createTask = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser, _a, title, description, isDaily, isSpecial, priority, points, deadline, type, team, access, subtasks, status, newTask, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        currUser = req.user;
                        _a = req.body, title = _a.title, description = _a.description, isDaily = _a.isDaily, isSpecial = _a.isSpecial, priority = _a.priority, points = _a.points, deadline = _a.deadline, type = _a.type, team = _a.team, access = _a.access, subtasks = _a.subtasks, status = _a.status;
                        // Validate required fields
                        if (!title || !description || !priority) {
                            throw new Error("Missing required fields");
                        }
                        newTask = new Task_model_1.Task({
                            title: title,
                            description: description,
                            deadline: new Date(deadline), // Convert to Date
                            isDaily: isDaily,
                            isSpecial: isSpecial,
                            creator: currUser.id, // Associate task with the user
                            points: points,
                            status: status,
                            type: type,
                            team: team,
                            access: access,
                            subtasks: subtasks,
                        });
                        // Save to database
                        return [4 /*yield*/, newTask.save()];
                    case 1:
                        // Save to database
                        _b.sent();
                        res.status(201).json({
                            success: true,
                            message: "Task created successfully",
                            data: newTask,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.error("Error during creating", error_3);
                        res
                            .status(500)
                            .json({ success: false, message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateTask = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser, _a, _id, title, description, isDaily, isSpecial, priority, points, deadline, type, team, access, subtasks, status, updatedTask, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        currUser = req.user;
                        _a = req.body, _id = _a._id, title = _a.title, description = _a.description, isDaily = _a.isDaily, isSpecial = _a.isSpecial, priority = _a.priority, points = _a.points, deadline = _a.deadline, type = _a.type, team = _a.team, access = _a.access, subtasks = _a.subtasks, status = _a.status;
                        // Validate required fields
                        if (!title || !description || !priority) {
                            throw new Error("Missing required fields");
                        }
                        return [4 /*yield*/, Task_model_1.Task.updateOne({ _id: _id }, __assign(__assign({}, req.body), { deadline: new Date(deadline) }), {
                                new: true,
                            })];
                    case 1:
                        updatedTask = _b.sent();
                        res.status(201).json({
                            success: true,
                            message: "Task updated successfully",
                            data: updatedTask,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error("Error during creating", error_4);
                        res
                            .status(500)
                            .json({ success: false, message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteTask = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser_1, taskId, result, error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        currUser_1 = req.user;
                        taskId = req.body.taskId;
                        result = void 0;
                        if (!(typeof taskId === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, Task_model_1.Task.deleteOne({ _id: taskId, creator: currUser_1.id })];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Promise.allSettled(taskId.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!id) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Task_model_1.Task.deleteOne({ _id: id, creator: currUser_1.id })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4:
                        res.status(201).json({
                            success: true,
                            message: "Tasks deleted successfully",
                            data: taskId,
                            result: result,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        console.error("Error during deleting tasks", error_5);
                        res
                            .status(500)
                            .json({ success: false, message: "Internal Server Error" });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.changeTaskStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, taskId, status, user, completedTask, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, taskId = _a.taskId, status = _a.status;
                        user = req.user;
                        return [4 /*yield*/, Task_model_1.Task.findOneAndUpdate({ creator: user.id, _id: taskId }, { status: status }, { new: true })];
                    case 1:
                        completedTask = _b.sent();
                        res
                            .status(200)
                            .json({
                            success: true,
                            message: "Task Status change successful",
                            data: completedTask,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        console.error("Error in changeTaskStatus:", error_6.message || error_6);
                        res.status(500).json({
                            success: false,
                            message: error_6.message || "Internal Server Error",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return tashController;
}());
exports.default = new tashController();
