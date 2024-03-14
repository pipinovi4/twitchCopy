"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
exports.default = () => {
    mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to the database successfully");
        mongoose_1.default.connection.on('disconnected', () => {
            console.log("Disconnected from MongoDB");
        });
        mongoose_1.default.connection.on('error', (error) => {
            console.log("MongoDB connection error", error);
        });
    }).catch((error) => {
        throw new ApiError_1.default(500, "Unforeseen error in the moment connection to the database", error);
    });
};
