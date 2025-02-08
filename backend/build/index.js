"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./utils/app");
var db_1 = require("./utils/db");
app_1.server.listen(process.env.PORT || 5001, function () {
    console.log("Server started at http://localhost:", process.env.PORT || 5001);
    (0, db_1.connectDB)();
});
