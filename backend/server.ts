import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth";


class Server {

    private app: Application;
    private DB_URI: string;

    public constructor() {
        dotenv.config();
        this.app = express();
        this.DB_URI = <string>process.env.DB_URI;
    }

    private initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    private initRoutes() {
        this.app.use("/api", authRoute);
    }

    private async connectToDB() {
        try {
            await mongoose.connect(this.DB_URI);
        } catch (error) {
            console.log(error);
        }
    }

    private async listen() {
        await this.connectToDB();
        this.app.listen(8080, () => {
            console.log("Server started on port 8080")
        })
    }

    public start() {
        this.initMiddlewares();
        this.initRoutes();
        this.listen();
    }
}


const server = new Server();
server.start();