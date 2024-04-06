import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext/userContext";
import { Roles, RouteValues } from "../utils/generalEnums";

const AuthGuard = () => {
  const { role } = useUserContext();
  return role === Roles.UNAUTHORISED ? (
    <Navigate to={RouteValues.LOGIN_PAGE} />
  ) : (
    <Outlet />
  );
};
export default AuthGuard;
