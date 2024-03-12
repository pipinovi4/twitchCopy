import expressConfig from './configurations/express-config';
import mongodbConfig from './configurations/mongodb-config';
import ApiError from "./src/exceptions/ApiError";

async function startServer() {
    expressConfig();
    await mongodbConfig();
};

startServer().then(r => console.log("Server fully launched")).catch((error) => new ApiError(500, 'Unforeseen error', error));