"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_routes_1 = __importDefault(require("./default-routes"));
const user_routes_1 = __importDefault(require("./user-routes"));
exports.default = (app) => {
    app.use("/user", (0, user_routes_1.default)());
    app.use('/', default_routes_1.default);
};
