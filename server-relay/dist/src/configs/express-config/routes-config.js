"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    app.get('/', (_, res) => {
        res.send("HTTPS Server with Express successfully connected, working with Hyper Text Transfer Protocol Security (HTTPS)");
    });
    app.use((_, res) => {
        return res.status(404).send("404: Page not found");
    });
};
