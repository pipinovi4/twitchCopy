import https from "https";
import express from "express";
import * as fs from "fs";

export default (app: express.Application) => {
    const options: {cert: string, key: string} = {
        cert: fs.readFileSync(process.env.PATH_TO_CERT, {encoding: "utf-8"}),
        key: fs.readFileSync(process.env.PATH_TO_KEY, {encoding: "utf-8"}),
    };

    const serverHttps: https.Server  = https.createServer(options, app);
    serverHttps.listen(process.env.PORT || 3000 , () => {
        console.log(`The server was started on the port: ${process.env.PORT || 3_000}`)
    });
};