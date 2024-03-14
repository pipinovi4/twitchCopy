"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/UserServices/userService"));
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
class UserController {
    setAuthCookies(res, userData) {
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.cookie('userId', userData.user._id, {
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
    }
    async registration(req, res, next) {
        try {
            const { email, password, userName } = req.body;
            const userData = await userService_1.default.registration(email, password, userName);
            this.setAuthCookies(res, userData);
            return res.status(200).json(userData);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService_1.default.login(email, password);
            this.setAuthCookies(res, userData);
            return res.status(200).json(userData);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService_1.default.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.clearCookie('userId');
            return res.status(200).json(userData);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService_1.default.refresh(refreshToken);
            this.setAuthCookies(res, userData);
            return res.status(200).json(userData);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService_1.default.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}
exports.default = new UserController();
