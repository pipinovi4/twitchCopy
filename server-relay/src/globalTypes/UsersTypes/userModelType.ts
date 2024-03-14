import { Types } from "mongoose";

export interface userModel {
    email: string;
    _id: Types.ObjectId;
    isActivated: boolean;
    avatar?: string;
    userName?: string | undefined;
    activationLink?: string | undefined;
}
