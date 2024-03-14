import { NextFunction, Request, Response } from "express"
import userService from "../services/UserServices/userService"
import validateUserData from "../helpers/validateUserData"

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

class AuthenticationController {
    setAuthCookies(res: Response, userData: any) {
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        res.cookie('userId', userData.user._id, {
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, userName } = req.body

            const userData = await userService.registration(
                email,
                password,
                userName
            )

            this.setAuthCookies(res, userData);

            return res.status(200).json(userData)
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const userData = await userService.login(email, password)

            this.setAuthCookies(res, userData);

            return res.status(200).json(userData)
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies

            const userData = await userService.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.clearCookie('userId')

            return res.status(200).json(userData)
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies

            const userData = await userService.refresh(refreshToken)

            this.setAuthCookies(res, userData);

            return res.status(200).json(userData)
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link

            await userService.activate(activationLink)

            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new AuthenticationController()