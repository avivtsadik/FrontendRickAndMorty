import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
interface ILoader {
  children: ReactNode;
  isLoading: boolean;
}
const Loader = ({ isLoading, children }: ILoader) => {
  return isLoading ? (
    <CircularProgress
      color="primary"
      sx={{ position: "absolute", top: "50%", left: "50%" }}
    />
  ) : (
    children
  );
};
export default Loader;
