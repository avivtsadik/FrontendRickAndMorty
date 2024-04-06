import axios from "axios";
import { ICharactersProps } from "../../components/CharactersList/charactersList.module";
let cancelTokenSource = axios.CancelToken.source();

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
  setAuthCompleteData(
    Array.from(new Set(charactersData.map((character) => character.name)))
  );
  return charactersData;
};

const fetchData = async (
  { pageParam = 1 },
  filterValue: string,
  isAdmin: boolean,
  setAuthCompleteData: (data: string[]) => void
) => {
  cancelTokenSource.cancel("New request is being made");

  cancelTokenSource = axios.CancelToken.source();
  try {
    const res = await axios.get(import.meta.env.VITE_API_ENDPOINT, {
      params: { page: pageParam, name: filterValue },
      cancelToken: cancelTokenSource.token,
    });
    const charactersData: ICharactersProps[] = transformData(
      res.data.results,
      isAdmin,
      setAuthCompleteData
    );
    return res.data.info.next !== null
      ? { data: charactersData, nextCursor: pageParam + 1 }
      : { data: charactersData };
  } catch (error) {
    // Handle error (e.g., cancelation)
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      throw error;
    }
  }
};
export default fetchData;
