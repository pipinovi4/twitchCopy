"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = __importDefault(require("../src/middlewares/error-middleware"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.default = () => {
    const options = {
        cert: "C:/Users/Пипин/Desktop/projects-portfolio/stream-place/cert.pem",
        key: "C:/Users/Пипин/Desktop/projects-portfolio/stream-place/key.pem",
    };
    const app = (0, express_1.default)();
    const serverHttps = https_1.default.createServer(options, app);
    const allowedOrigins = ["https://localhost:5173"];
    app.get('/', (req, res) => {
        res.send("HTTPS Server with Express successfully connected, working with Hyper Text Transfer Protocol Security (HTTPS CONNECTION)");
    });
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS (Hyper Text Transfer Protocol) cannot be secure for operation"));
            }
        },
        credentials: true,
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json({ limit: '3mb', strict: true }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '3mb' }));
    app.use(express_1.default.static("public", {
        maxAge: "1d",
        etag: false,
    }));
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        limit: 100,
    }));
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(error_middleware_1.default);
    app.use((req, res) => {
        return res.status(404).send("404: Page not found");
    });
    serverHttps.listen(process.env.PORT, () => {
        console.log(`The server was started on the port: ${process.env.PORT || 3_000}`);
    });
};
