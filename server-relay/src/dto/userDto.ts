import { Types } from "mongoose";
import { userModel } from "../globalTypes/UsersTypes/userModelType";

export default class userDto {
    email: string;
    _id: Types.ObjectId;
    isActivated: boolean;

    constructor(model: userModel) {
        this.email = model.email;
        this._id = model._id;
        this.isActivated = model.isActivated;
    };
};
