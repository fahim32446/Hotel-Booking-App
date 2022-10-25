import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


const corsOptions ={
    origin:['http://localhost:5173', 'https://api.cloudinary.com', 'http://localhost:5174'], 
    credentials:true,           
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) 




import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

dotenv.config()

app.use(cookieParser());



app.use(express.json());





const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error
    }
}


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(5000, () => {
    connect();
    console.log("Connected to backend.");
});