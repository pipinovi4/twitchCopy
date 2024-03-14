import mongoose from 'mongoose';
import ApiError from "../exceptions/ApiError";

export default () => {
        mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Connected to the database successfully");

            mongoose.connection.on('disconnected', () => {
                console.log("Disconnected from MongoDB");
            });

            mongoose.connection.on('error', (error) => {
                console.log("MongoDB connection error", error);
            });
        }).catch((error) => {
            throw new ApiError(500, "Unforeseen error in the moment connection to the database", error);
        })
};