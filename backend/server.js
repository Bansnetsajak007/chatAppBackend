import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.route.js";
import connectToDatabase from "./DB/dbconfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());  /// to parse the incoming requests with JSON payloads (from req.body)
app.use("/api/auth", authroutes);

app.get('/' , (req ,res) => {
    res.send('Hello World!')
})

app.listen(PORT ,() => {
    connectToDatabase();
    console.log(`Listening on ${PORT}`);
})