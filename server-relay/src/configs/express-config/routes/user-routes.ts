import UserController from "../../../controllers/UserController";
import Router from "express";

const router = Router();

export default () => {
    router.post('/registration', UserController.registration);
    router.post('/login', UserController.login);
    router.get('/refresh', UserController.refresh);
    router.get('/logout', UserController.logout);
    router.get('/activate', UserController.activate);

    return router;
}