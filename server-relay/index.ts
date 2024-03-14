require("dotenv").config();
import expressConfig from "./src/configs/express-config/index-express";
import mongodbConfig from "./src/configs/mongodb-config";

function startServer() {
    expressConfig();
    mongodbConfig();
}

startServer();