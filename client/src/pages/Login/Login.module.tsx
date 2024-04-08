import { useNavigate } from "react-router-dom";
import { Roles, RouteValues } from "../../utils/generalEnums";
import { useUserContext } from "../../context/userContext/userContext";
import { useSnackbar } from "notistack";
import { useCallback, useRef } from "react";
import { UsersMap } from "../../utils/mockData";

const useLogin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setRole } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const LoginUser = useCallback(
    (username: string | undefined, password: string | undefined) => {
      if (UsersMap.get(username as Roles) === password) {
        setRole(username as Roles);
        navigate(RouteValues.HOME_PAGE);
        enqueueSnackbar("Successfull login :)", { variant: "success" });
      } else {
        enqueueSnackbar("Incorrect credentials :(", { variant: "error" });
      }
    },
    [setRole, enqueueSnackbar, navigate]
  );

  return {
    usernameRef,
    passwordRef,
    LoginUser,
  };
};

export default useLogin;
