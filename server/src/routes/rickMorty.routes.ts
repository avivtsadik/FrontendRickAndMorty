import { Router } from "express";
import { RickMortyController } from "../controllers/rickMorty.controller";
import validationMiddleware from "../middlewears/validation.middlewear";
import { InsertRickMortyDto } from "../dtos/rickMorty.dto";

class RickMortyRoutes {
  public router: Router;
  private rickMortyController: RickMortyController;

  constructor() {
    this.router = Router();
    this.rickMortyController = new RickMortyController();
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", this.rickMortyController.welcome);
    this.router.post("/insert", validationMiddleware(InsertRickMortyDto,'body'),this.rickMortyController.insertRickAndMortys);
  }
}

export default new RickMortyRoutes().router;
