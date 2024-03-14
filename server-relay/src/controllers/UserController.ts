import { NextFunction, Request, Response } from "express";
import userService from "../services/UserService";
import validateUserData from "../helpers/validateUserData";

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

class UserController {
    private setAuthCookies = (res: Response, userData: any) => {
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

     registration = async (req: Request, res: Response) => {
        try {
            const { email, password, userName } = req.body;

            const userData = await userService.registration(
                email,
                password,
                userName
            );

            console.log(userData);

            this.setAuthCookies(res, userData);

            return res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    };

     login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { personalInformation, password } = req.body;

            validateUserData(personalInformation, password, req);

            const userData = await userService.login(
                personalInformation,
                password
            );

            this.setAuthCookies(res, userData);

            return res.status(200).json(userData);
        } catch (error) {
            next(error)
        }
    };

     logout = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.cookies;

            const userData = await userService.logout(refreshToken);

            res.clearCookie("refreshToken");
            res.clearCookie("userId");

            return res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    };

     refresh = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.cookies;

            const userData = await userService.refresh(refreshToken);

            this.setAuthCookies(res, userData);

            return res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    };

     activate = async (req: Request, res: Response) => {
        try {
            const activationLink = req.params.link;

            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    };
}

export default new UserController();