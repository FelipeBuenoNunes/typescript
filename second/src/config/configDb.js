"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = require("./dotenv");
exports.default = new pg_1.Pool({
    user: dotenv_1.db.user,
    password: dotenv_1.db.password,
    host: "localhost",
    port: 5433
});
