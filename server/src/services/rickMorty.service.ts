import { InsertRickMortyDto } from "../dtos/rickMorty.dto";
import { HttpException } from "../exceptions/HttpException";
import rickMortyModel from "../models/rickMorty.model";
import { logMessage } from "../utils/logger";

export class RickMortyService {
  private rickMorty = rickMortyModel;

  public async insertRickMortys(data: InsertRickMortyDto[]): Promise<void> {
    try {
      await this.rickMorty.insertMany(data);
    } catch (e: unknown) {
    //   throw new HttpException(500,"unknown error")
      logMessage(e)
    }
  }
}
