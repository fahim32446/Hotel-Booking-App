import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();


const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://api.cloudinary.com',
        'http://localhost:5174',
        'https://booking-app-live.netlify.app',
        'https://booking-app-dashboard.netlify.app',
        'https://booking-app-api-v1.herokuapp.com',
        'https://booking-app-api-v1.herokuapp.com/api/users'

    ],
    credentials: true,
    optionSuccessStatus: 200,
    sameSite: "none",
    secure: true,
    domain: "http://localhost:5173",
    httpOnly: true
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


app.listen(process.env.PORT || PORT, () => {
    connect();
    console.log(`Running on ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("App is running")
})