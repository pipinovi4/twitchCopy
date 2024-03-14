"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_config_1 = __importDefault(require("./https-config"));
const middlewares_config_1 = __importDefault(require("./middlewares-config"));
const routes_config_1 = __importDefault(require("./routes-config"));
const config_validation_1 = __importDefault(require("./config-validation"));
exports.default = () => {
    (0, config_validation_1.default)();
    const app = (0, express_1.default)();
    (0, https_config_1.default)(app);
    (0, middlewares_config_1.default)(app);
    (0, routes_config_1.default)(app);
};
