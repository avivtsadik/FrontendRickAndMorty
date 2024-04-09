import { NextFunction, Request, Response } from "express";
import { RickMortyService } from "../services/rickMorty.service";
import { InsertRickMortyDto } from "../dtos/rickMorty.dto";

export class RickMortyController {
  private rickMortyService: RickMortyService;
  constructor() {
    this.rickMortyService = new RickMortyService();
  }
  public welcome = (req: Request, res: Response, next: NextFunction) => {
    return res.json({ message: "Welcome to aviv application." });
  };
  public insertRickAndMortys = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dataToInsert: InsertRickMortyDto[] = req.body;
      await this.rickMortyService.insertRickMortys(dataToInsert);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  };
}
