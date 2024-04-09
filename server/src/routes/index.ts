import { Application, Router } from "express";
import RickMortyRoutes from "./rickMorty.routes";

export default class Routes {
  constructor(app: Application) {
    const apiRouter = Router();
    apiRouter.use("/rickandmorty", RickMortyRoutes);

    app.use("/api", apiRouter);
  }
}
