import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authroutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import connectToDatabase from "./DB/dbconfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());  /// to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); /// to parse the incoming cookies from req.cookies

app.use("/api/auth", authroutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get('/' , (req ,res) => {
    res.send('Hello World!')   
})

app.listen(PORT ,() => {
    connectToDatabase();
    console.log(`Listening on ${PORT}`);
})