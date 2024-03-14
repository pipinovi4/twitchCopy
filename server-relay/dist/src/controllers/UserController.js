"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const validateUserData_1 = __importDefault(require("../helpers/validateUserData"));
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
class UserController {
    setAuthCookies = (res, userData) => {
        res.cookie("refreshToken", userData.refreshToken, {
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.cookie("userId", userData.user._id, {
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
    };
    registration = async (req, res) => {
        try {
            const { email, password, userName } = req.body;
            const userData = await UserService_1.default.registration(email, password, userName);
            console.log(userData);
            this.setAuthCookies(res, userData);
            return res.status(200).json(userData);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    };
    login = async (req, res, next) => {
        try {
            const { personalInformation, password } = req.body;
            (0, validateUserData_1.default)(personalInformation, password, req);
            const userData = await UserService_1.default.login(personalInformation, password);
            this.setAuthCookies(res, userData);
            return res.status(200).json(userData);
        }
        catch (error) {
            next(error);
        }
    };
    logout = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService_1.default.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.clearCookie("userId");
            return res.status(200).json(userData);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    };
    refresh = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService_1.default.refresh(refreshToken);
            this.setAuthCookies(res, userData);
            return res.status(200).json(userData);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    };
    activate = async (req, res) => {
        try {
            const activationLink = req.params.link;
            await UserService_1.default.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    };
}
exports.default = new UserController();
