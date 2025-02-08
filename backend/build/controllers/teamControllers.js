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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Task_model_1 = require("../models/Task.model");
var Team_model_1 = require("../models/Team.model");
var teamController = /** @class */ (function () {
    function teamController() {
        var _this = this;
        this.getAllTeams = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser, teams, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currUser = req.user;
                        if (!currUser) {
                            throw new Error("No user present");
                        }
                        return [4 /*yield*/, Team_model_1.Team.find({ members: currUser.id }).populate("members")];
                    case 1:
                        teams = _a.sent();
                        res.json({
                            success: true,
                            data: teams,
                            message: "Team fetched successfully",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error during fetching Teams :", error_1);
                        res.status(500).json({
                            success: false,
                            message: "Internal Server Error",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createTeam = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser, _a, name, description, members, team, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        currUser = req.user;
                        _a = req.body, name = _a.name, description = _a.description, members = _a.members;
                        if (!currUser) {
                            throw new Error("No user present");
                        }
                        return [4 /*yield*/, Team_model_1.Team.create({
                                name: name,
                                description: description,
                                creator: currUser.id,
                                members: __spreadArray(__spreadArray([], members, true), [currUser.id], false),
                            })];
                    case 1:
                        team = _b.sent();
                        res.json({
                            success: true,
                            data: team,
                            message: "Team created successfully",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.error("Error during creating team :", error_2);
                        res.status(500).json({
                            success: false,
                            message: "Internal Server Error",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateTeam = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser, _a, _id, name, description, members, updatedTeam, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        currUser = req.user;
                        _a = req.body, _id = _a._id, name = _a.name, description = _a.description, members = _a.members;
                        members = members.map(function (member) { return member._id; });
                        // Validate required fields
                        if (!name || !description) {
                            throw new Error("Missing required fields");
                        }
                        return [4 /*yield*/, Team_model_1.Team.findOneAndUpdate({ _id: _id }, __assign(__assign({}, req.body), { members: members }), {
                                new: true,
                            }).populate("members")];
                    case 1:
                        updatedTeam = _b.sent();
                        res.status(201).json({
                            success: true,
                            message: "Team updated successfully",
                            data: updatedTeam,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.error("Error during updating team", error_3);
                        res
                            .status(500)
                            .json({ success: false, message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteTask = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var currUser_1, taskIds, result, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currUser_1 = req.user;
                        taskIds = req.body.taskIds;
                        // Validate required fields
                        if (taskIds.length <= 0) {
                            throw new Error("Missing _id fields");
                        }
                        return [4 /*yield*/, Promise.allSettled(taskIds.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
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
                    case 1:
                        result = _a.sent();
                        res.status(201).json({
                            success: true,
                            message: "Tasks deleted successfully",
                            data: result,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error("Error during deleting tasks", error_4);
                        res
                            .status(500)
                            .json({ success: false, message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return teamController;
}());
exports.default = new teamController();
