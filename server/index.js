import express from "express";
import mongoose from "mongoose";
import route from "./routes/bookRoute.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv()

const server = express()

server.use(cors())
server.use(express.json())
server.use('/books',route)
server.use('/user',userRouter)


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Database Connected")
    server.listen(3002)
})

