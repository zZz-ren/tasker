"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = require("passport-google-oauth20");
var dotenv_1 = __importDefault(require("dotenv"));
var User_model_1 = require("../models/User.model");
dotenv_1.default.config();
var clientID = process.env.GOOGLE_CLIENT_ID;
var clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientID || !clientSecret) {
    throw new Error("Invalid client credentials");
}
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: process.env.CALLBACK_URL,
}, function (accessToken, refreshToken, profile, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userData, userCheck, newUser, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                user = {
                    googleId: profile.id,
                    name: profile.displayName,
                    firstName: (_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName,
                    lastName: (_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName,
                    email: profile.emails && profile.emails[0].value,
                    avatar: profile.photos && profile.photos[0].value,
                };
                userData = {};
                return [4 /*yield*/, User_model_1.User.findOne({ googleId: user.googleId })];
            case 1:
                userCheck = _c.sent();
                if (!userCheck) return [3 /*break*/, 2];
                userData = {
                    _id: userCheck._id,
                    email: userCheck.email,
                    avatar: userCheck.avatar,
                    name: userCheck.name,
                };
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, User_model_1.User.create(user)];
            case 3:
                newUser = _c.sent();
                userData = {
                    _id: newUser._id,
                    email: newUser.email,
                    avatar: newUser.avatar,
                    name: newUser.name,
                };
                _c.label = 4;
            case 4:
                callback(null, userData);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _c.sent();
                if (error_1 instanceof Error) {
                    return [2 /*return*/, callback(error_1, false)];
                }
                return [2 /*return*/, callback(new Error("Unknown error occured"), profile)];
            case 6: return [2 /*return*/];
        }
    });
}); }));
passport_1.default.serializeUser(function (user, callback) {
    callback(null, user);
});
passport_1.default.deserializeUser(function (user, callback) {
    callback(null, user);
});
exports.default = passport_1.default;
