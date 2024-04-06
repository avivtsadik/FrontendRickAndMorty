import { useEffect, useState } from "react";

const useDebounce = (searchParam: string, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState(searchParam);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchParam);
    }, ms);
    return () => {
      clearTimeout(handler);
    };
  }, [searchParam, ms]);
  return debouncedValue;
};
export default useDebounce;
