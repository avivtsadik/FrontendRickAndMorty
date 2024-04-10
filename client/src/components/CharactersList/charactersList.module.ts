import useDebounce from "../../hooks/useDebounce";
import { ICharacterProps } from "../character";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUserContext } from "../../context/userContext/userContext";
import { Roles } from "../../utils/generalEnums";
import { useMemo, useState } from "react";
import fetchData from "../../api/services/RickAndMorty";

export interface ICharactersProps extends ICharacterProps {
  id: number;
}

export const useCharactersList = () => {
  const [filterText, setFilterText] = useState("");
  const { role } = useUserContext();
  const debouncedValue = useDebounce(filterText, 500);
  const isAdmin = useMemo(() => role === Roles.ADMIN, [role]);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["characters", debouncedValue],
    queryFn: (pageParam) =>
      fetchData(pageParam, debouncedValue, isAdmin, false),
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor;
    },
    initialPageParam: 1,
    retry: false,
    staleTime: Infinity,
  });

  const authCompleteData = useMemo(() => {
    const dataRetrived =
      data?.pages.map((group) =>
        group?.data.map((data: ICharactersProps) => data.name)
      ) ?? [];
    const authCompleteData3 = dataRetrived
      .flat()
      .filter((name): name is string => typeof name === "string");
    const authCompleteData4 = Array.from(new Set(authCompleteData3));
    return authCompleteData4;
  }, [data]);

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    setFilterText,
    filterText,
    authCompleteData,
  };
};
