import ApiError from "../exceptions/ApiError";
import {Request, Response, NextFunction} from "express";

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message, errors: error.errors});
    }

    return res.status(500).json({message: "Unexpected error, please try again later"});
};