import { StatusValues } from "./constants";

export interface IRickMorty {
  name: string;
  status: StatusValues;
  species: string;
  currentLocation?: string;
  image: string;
  numOfEpisodes: number;
}
