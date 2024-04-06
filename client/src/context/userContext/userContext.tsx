import { createContext, useContext } from "react";
import { Roles } from "../../utils/generalEnums";
interface IUserContext {
  role: Roles;
  setRole: (role: Roles) => void;
}
export const UserContext = createContext<IUserContext>({
  role: Roles.UNAUTHORISED,
  setRole: (role: Roles) => {},
});
export const useUserContext = () => useContext(UserContext);
