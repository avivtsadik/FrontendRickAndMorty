import { IsNumberString, IsString } from "class-validator";

export class GetRickMortyDto {
  @IsNumberString()
  public page: string;

  @IsString()
  public name: string;
}
