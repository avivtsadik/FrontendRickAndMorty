import axios from "axios";
import { ICharactersProps } from "../../components/CharactersList/charactersList.module";

const transformData = (
  data: any,
  isAdmin: boolean,
  setAuthCompleteData: (data: string[]) => void
) => {
  let charactersData: ICharactersProps[] = [];
  data.map((record: any) => {
    let characterData: ICharactersProps = {
      id: record.id,
      image: record.image,
      numOfEpisodes: record.episode.length,
      currentLocation: isAdmin ? record.location.name : null,
      status: record.status,
      name: record.name,
      species: record.species,
    } as ICharactersProps;
    charactersData.push(characterData);
  });
  setAuthCompleteData(Array.from(new Set(charactersData.map((character=>character.name)))));
  return charactersData;
};

const fetchData = async (
  { pageParam = 1 },
  debouncedValue: string,
  isAdmin: boolean,
  setAuthCompleteData: (data: string[]) => void
) => {
  const res = await axios.get(import.meta.env.VITE_API_ENDPOINT, {
    params: { page: pageParam, name: debouncedValue },
  });
  const charactersData: ICharactersProps[] = transformData(
    res.data.results,
    isAdmin,
    setAuthCompleteData
  );
  return res.data.info.next !== null
    ? { data: charactersData, nextCursor: pageParam + 1 }
    : { data: charactersData };
};
export default fetchData;
