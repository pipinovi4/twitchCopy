import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "../../middlewares/error-middleware";

export default (app: express.Application) => {
    const allowedOrigins = ["https://localhost:5173"];
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.indexOf(origin) !== -1 ) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS (Hyper Text Transfer Protocol) cannot be secure for operation"))
            }
        },
        credentials: true,
    }));
    app.use(cookieParser());
    app.use(express.json({limit: "3mb", strict: true}));
    app.use(express.urlencoded({ extended: true, limit: "3mb"}));
    app.use(express.static("public", {
        maxAge: "1d",
        etag: false,
    }));
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
    }));
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(errorMiddleware);
};