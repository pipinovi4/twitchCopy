"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
exports.default = (app) => {
    const options = {
        cert: process.env.PATH_TO_CERT,
        key: process.env.PATH_TO_KEY,
    };
    const serverHttps = https_1.default.createServer(options, app);
    serverHttps.listen(process.env.PORT, () => {
        console.log(`The server was started on the port: ${process.env.PORT || 3_000}`);
    });
};
