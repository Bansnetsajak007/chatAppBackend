import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting", error.message);
    }
};

export default connectToDatabase;