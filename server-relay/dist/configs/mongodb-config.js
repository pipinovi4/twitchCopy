"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../src/exceptions/ApiError"));
exports.default = async () => {
    try {
        await mongoose_1.default.connect("mongodb://127.0.0.1:27017/twitch");
        console.log("Connected to the database successfully");
        mongoose_1.default.connection.once('open', () => console.log("Connected to MongoDB successfully"));
    }
    catch (error) {
        throw new ApiError_1.default(500, "Unforeseen error in the moment connection to the database", error);
    }
};
