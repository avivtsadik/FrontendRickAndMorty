import express from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import { SERVER_URL } from "./config";
import { dbConnection } from "./database";
import { connect, disconnect } from "mongoose";
import errorMiddleware from "./middlewears/error";
import { logMessage } from "./utils/logger";
import { HttpException } from "./exceptions/HttpException";

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.connectToDatbase();
    this.initMiddlewears();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initMiddlewears(): void {
    const corsOptions: CorsOptions = {
      origin: SERVER_URL,
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async initializeRoutes() {
    new Routes(this.app);
  }

  private async connectToDatbase() {
    try {
      await connect(dbConnection.url);
      logMessage("connected to datbase");
    } catch (error: unknown) {
      logMessage(error);
      throw new HttpException(500, "error connecting to db");
    }
  }

  private async CloseDatbaseConnection() {
    try {
      await disconnect();
      logMessage("Connection closed");
    } catch (err) {
      logMessage(err);
    }
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
