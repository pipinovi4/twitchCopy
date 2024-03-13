require('dotenv').config();
import https, {Server} from "https";
import express, { Application, Response, Request } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "../middlewares/error-middleware";
import morgan from 'morgan'
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export default () => {
    const options = {
        cert: "C:/Users/Пипин/Desktop/projects-portfolio/stream-place/cert.pem",
        key: "C:/Users/Пипин/Desktop/projects-portfolio/stream-place/key.pem",
    };
    const app: Application = express();
    const serverHttps = https.createServer(options, app);
    const allowedOrigins = ["https://localhost:5173"];

    app.get('/', (req, res) => {
        res.send("HTTPS Server with Express successfully connected, working with Hyper Text Transfer Protocol Security (HTTPS CONNECTION)");
    });

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
    app.use(express.json({limit: '3mb', strict: true}));
    app.use(express.urlencoded({ extended: true, limit: '3mb'}));
    app.use(express.static("public", {
        maxAge: "1d",
        etag: false,
    }));
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
    }));
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(errorMiddleware);
    app.use((req: Request, res: Response) => {
        return res.status(404).send("404: Page not found")
    })

    serverHttps.listen(process.env.PORT, () => {
        console.log(`The server was started on the port: ${process.env.PORT || 3_000}`)
    })
};