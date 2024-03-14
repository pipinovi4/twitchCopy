import express from "express";
import httpsConfig from "./https-config";
import middlewaresConfig from "./middlewares-config";
import appRoutes from "./routes/index-routes";
import validateConfig from "./config-validation";

export default () => {
    validateConfig();

    const app: express.Application = express();

    httpsConfig(app);
    middlewaresConfig(app);
    appRoutes(app);
};