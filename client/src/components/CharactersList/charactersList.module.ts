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
  const [authCompleteData, setAuthCompleteData] = useState<string[]>([]);
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
      fetchData(pageParam, debouncedValue, isAdmin, setAuthCompleteData),
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor;
    },
    initialPageParam: 1,
    retry: false,
    staleTime: Infinity,
  });
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
