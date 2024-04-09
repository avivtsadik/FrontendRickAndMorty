import { IsEnum, IsString } from "class-validator";
import { StatusValues } from "../utils/constants";

export class InsertRickMortyDto {
  @IsString()
  public name: string;

//   @IsEnum(StatusValues)
//   public status: StatusValues;

//   @IsString()
//   public species: string;

//   @IsString()
//   public currentLocation: string;

//   @IsString()
//   public image: string;

//   @IsString()
//   public numOfEpisodes: string[];
}
