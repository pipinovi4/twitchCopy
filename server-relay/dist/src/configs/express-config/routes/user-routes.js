"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../../../controllers/UserController"));
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
exports.default = () => {
    router.post("/registration", UserController_1.default.registration);
    router.post("/login", UserController_1.default.login);
    router.get("/refresh", UserController_1.default.refresh);
    router.get("/logout", UserController_1.default.logout);
    router.get("/activate", UserController_1.default.activate);
    return router;
};
