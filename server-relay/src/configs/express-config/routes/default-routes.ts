import Router, { Response } from "express";
const router = Router();

export default () => {
    router.get('/', (_, res) => {
        res.send("HTTPS Server with Express successfully connected, working with Hyper Text Transfer Protocol Security (HTTPS)");
    });
    router.use((_, res: Response) => {
        return res.status(404).send("404: Page not found")
    })

    return router;
};