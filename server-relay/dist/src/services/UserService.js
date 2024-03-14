"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const userDto_1 = __importDefault(require("../dto/userDto"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt = __importStar(require("bcrypt"));
const uuid = __importStar(require("uuid"));
const TokenService_1 = __importDefault(require("./TokenService"));
const MailService_1 = __importDefault(require("./MailService"));
class userService {
    async registration(email, password, userName) {
        try {
            const candidate = await UserModel_1.default.findOne({ email });
            if (candidate) {
                ApiError_1.default.BadRequest("User with email already exists");
            }
            const hashPassword = await bcrypt.hash(password, 7);
            const activationLink = uuid.v4();
            const user = await UserModel_1.default.create({
                email,
                password: hashPassword,
                activationLink,
                userName,
            });
            await MailService_1.default.sendActivationLink(email, `${process.env.API_URL}/authorization/activate/${activationLink}`);
            const userDto = new userDto_1.default(user);
            const tokens = TokenService_1.default.generateToken({ ...userDto });
            if (!tokens) {
                ApiError_1.default.UnforeseenError();
            }
            await TokenService_1.default.saveToken(userDto._id, tokens.refreshToken);
            return { ...tokens, user: userDto };
        }
        catch (e) {
            console.error(e);
            throw ApiError_1.default.UnforeseenError();
        }
    }
    ;
    async login(personalInformation, password) {
        try {
            let user;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(personalInformation)) {
                user = await UserModel_1.default.findOne({ email: personalInformation });
            }
            else {
                user = await UserModel_1.default.findOne({
                    userName: personalInformation,
                });
            }
            if (!user) {
                ApiError_1.default.UnAuthorizedError();
            }
            const isPassEqual = await bcrypt.compare(password, user.password);
            if (!isPassEqual) {
                ApiError_1.default.BadRequest("Password is not correct");
            }
            const userDto = new userDto_1.default(user);
            const tokens = TokenService_1.default.generateToken({ ...userDto });
            if (!tokens) {
                ApiError_1.default.UnforeseenError("Error when trying create tokens");
            }
            await TokenService_1.default.saveToken(userDto._id, tokens.refreshToken);
            return { ...tokens, user: userDto };
        }
        catch (error) {
            console.error('An error occurred during login:', error.message);
            if (error instanceof ApiError_1.default) {
                throw error;
            }
            else {
                throw ApiError_1.default.UnforeseenError('An unexpected error occurred during login');
            }
        }
    }
    ;
    async activate(activationLink) {
        const user = await UserModel_1.default.findOne({ activationLink });
        if (!user) {
            throw ApiError_1.default.BadRequest("Uncorrected link");
        }
        user.isActivated = true;
        await user.save();
    }
    ;
    async logout(refreshToken) {
        return await TokenService_1.default.removeToken(refreshToken);
    }
    ;
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError_1.default.UnAuthorizedError();
        }
        const userData = TokenService_1.default.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService_1.default.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError_1.default.UnAuthorizedError();
        }
        const user = await UserModel_1.default.findById(userData);
        if (user) {
            const userDto = new userDto_1.default(user);
            const tokens = TokenService_1.default.generateToken({ ...userDto });
            if (!tokens) {
                throw ApiError_1.default.UnAuthorizedError();
            }
            await TokenService_1.default.saveToken(userDto._id, tokens.refreshToken);
            return { ...tokens, user: userDto };
        }
    }
    ;
}
exports.default = new userService();
