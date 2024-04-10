import axios from "axios";
import { ICharactersProps } from "../../components/CharactersList/charactersList.module";
import AxiosInstance from "../../utils/axiosInstance";
import { ApiRoutes } from "../../utils/generalEnums";
let cancelTokenSource = axios.CancelToken.source();

const transformData = (
  data: any,
  isAdmin: boolean,
  isMyApi: boolean,
) => {
  let charactersData: ICharactersProps[] = [];
  data.map((record: any) => {
    let characterData: ICharactersProps = {
      id: isMyApi ? record._id : record.id,
      image: record.image,
      numOfEpisodes: isMyApi ? record.episodes.length : record.episode.length,
      currentLocation: isAdmin
        ? isMyApi
          ? record.currentLocation
          : record.location.name
        : null,
      status: record.status,
      name: record.name,
      species: record.species,
    } as ICharactersProps;
    charactersData.push(characterData);
  });
  return charactersData;
};

const fetchData = async (
  { pageParam = 1 },
  filterValue: string,
  isAdmin: boolean,
  isMyApi: boolean,
) => {
  cancelTokenSource.cancel("New request is being made");

  cancelTokenSource = axios.CancelToken.source();
  try {
    let res;
    if (isMyApi) {
      res = await AxiosInstance.get(
        import.meta.env.VITE_APP_BACKEND_PREFIX +
          "" +
          ApiRoutes.SELECT_RICKMORTY,
        {
          params: { page: pageParam - 1, name: filterValue },
          cancelToken: cancelTokenSource.token,
        }
      );
    } else {
      res = await axios.get(import.meta.env.VITE_RICKMORTY_API_ENDPOINT, {
        params: { page: pageParam, name: filterValue },
        cancelToken: cancelTokenSource.token,
      });
    }
    const charactersData: ICharactersProps[] = transformData(
      isMyApi ? res.data.paginatedData : res.data.results,
      isAdmin,
      isMyApi,
    );
    const hasNext = isMyApi ? res.data.hasNext : res.data.info.next !== null;
    return hasNext
      ? { data: charactersData, nextCursor: pageParam + 1 }
      : { data: charactersData };
  } catch (error) {
    // Handle error (e.g., cancelation)
    console.log(error);
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      throw error;
    }
  }
};
export default fetchData;
