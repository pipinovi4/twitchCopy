import mongoose from 'mongoose';
import ApiError from "../src/exceptions/ApiError";

export default async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/twitch");
        console.log("Connected to the database successfully");
        mongoose.connection.once('open', () => console.log("Connected to MongoDB successfully"));
    } catch (error: any) {
        throw new ApiError(500, "Unforeseen error in the moment connection to the database", error);
    }
};

