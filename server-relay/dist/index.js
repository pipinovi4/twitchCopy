"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_config_1 = __importDefault(require("./configs/express-config"));
const mongodb_config_1 = __importDefault(require("./configs/mongodb-config"));
const ApiError_1 = __importDefault(require("./src/exceptions/ApiError"));
async function startServer() {
    (0, express_config_1.default)();
    await (0, mongodb_config_1.default)();
}
startServer().then(r => console.log("Server fully launched")).catch((error) => new ApiError_1.default(500, 'Unforeseen error', error));
