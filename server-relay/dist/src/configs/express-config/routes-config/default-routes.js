"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
exports.default = () => {
    router.get('/', (_, res) => {
        res.send("HTTPS Server with Express successfully connected, working with Hyper Text Transfer Protocol Security (HTTPS)");
    });
    router.use((_, res) => {
        return res.status(404).send("404: Page not found");
    });
    return router;
};
