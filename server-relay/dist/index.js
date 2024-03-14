"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const index_express_1 = __importDefault(require("./src/configs/express-config/index-express"));
const mongodb_config_1 = __importDefault(require("./src/configs/mongodb-config"));
function startServer() {
    (0, index_express_1.default)();
    (0, mongodb_config_1.default)();
}
startServer();
