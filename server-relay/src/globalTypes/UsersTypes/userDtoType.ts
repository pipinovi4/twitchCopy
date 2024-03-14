import { Types } from "mongoose";

export interface userDto {
    email: string;
    _id: Types.ObjectId;
    isActivated: boolean;
}
