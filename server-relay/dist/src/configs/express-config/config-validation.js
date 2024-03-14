"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schemaConfig = joi_1.default.object({
    PATH_TO_CERT: joi_1.default.string().required(),
    PATH_TO_KEY: joi_1.default.string().required(),
    PORT: joi_1.default.number().integer().min(1).max(65535).required(),
});
exports.default = () => {
    const { error } = schemaConfig.validate(process.env);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
};
