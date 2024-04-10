import { LIMIT_PAGINATED_REQ } from "../config";
import { GetRickMortyDto } from "../dtos/GetrickMorty.dto";
import { InsertRickMortyDto } from "../dtos/InsertrickMorty.dto";
import { HttpException } from "../exceptions/HttpException";
import rickMortyModel from "../models/rickMorty.model";
import { IRickMorty } from "../utils/rickMorty.interface";
interface IPaginationData {
  paginatedData: IRickMorty[];
  countDoc: number;
}
export class RickMortyService {
  private rickMorty = rickMortyModel;

  public async selectRickAndMortys(
    params: GetRickMortyDto
  ): Promise<IPaginationData> {
    try {
      // const countDoc: number = await this.rickMorty.countDocuments({
      //   name: { $regex: new RegExp(params.name) },
      // });
      // const paginatedData: IRickMorty[] = await this.rickMorty.find(
      //   {
      //     name: { $regex: new RegExp(params.name) },
      //   },
      //   {},
      //   {
      //     lean: true,
      //     skip: parseInt(params.page) * parseInt(LIMIT_PAGINATED_REQ),
      //     limit: parseInt(LIMIT_PAGINATED_REQ),
      //     count: true,
      //   }
      // );

      const [{ paginatedData, countDoc }]: {
        paginatedData: IRickMorty[];
        countDoc: { total: number }[];
      }[] = await this.rickMorty.aggregate([
        {
          $match: { name: { $regex: new RegExp(params.name) } },
        },
        {
          $facet: {
            paginatedData: [
              { $skip: parseInt(params.page) * parseInt(LIMIT_PAGINATED_REQ) },
              { $limit: parseInt(LIMIT_PAGINATED_REQ) },
            ],
            countDoc: [{ $count: "total" }],
          },
        },
      ]);

      return {
        paginatedData,
        countDoc: countDoc.length > 0 ? countDoc[0].total : 0,
      };
    } catch (e: unknown) {
      throw new HttpException(500, "Select pagination failed " + e);
    }
  }

  public async insertRickMortys(data: InsertRickMortyDto[]): Promise<void> {
    try {
      await this.rickMorty.insertMany(data);
    } catch (e: unknown) {
      throw new HttpException(500, "Insert many failed " + e);
    }
  }
}
