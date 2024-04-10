import { NextFunction, Request, Response } from "express";
import { RickMortyService } from "../services/rickMorty.service";
import { InsertRickMortyDto } from "../dtos/InsertrickMorty.dto";
import { GetRickMortyDto } from "../dtos/GetrickMorty.dto";
import { logMessage } from "../utils/logger";
import { plainToInstance } from "class-transformer";
import { LIMIT_PAGINATED_REQ } from "../config";

export class RickMortyController {
  private rickMortyService: RickMortyService;
  constructor() {
    this.rickMortyService = new RickMortyService();
  }
  public selectRickAndMortys = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const params = plainToInstance(GetRickMortyDto, req.query);

      const { paginatedData, countDoc } =
        await this.rickMortyService.selectRickAndMortys(params);
      const pagesLeft =
        Math.ceil(countDoc / parseInt(LIMIT_PAGINATED_REQ)) -
        (parseInt(params.page) + 1);
      return res.json({ paginatedData, hasNext: pagesLeft > 0 });
    } catch (err) {
      next(err);
    }
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
