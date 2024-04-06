import { ReactNode, useState } from "react";
import { UserContext } from "./userContext";
import { Roles } from "../../utils/generalEnums";
interface IUserProvider {
  children: ReactNode;
}
const UserProvider: React.FC<IUserProvider> = ({
  children,
}: IUserProvider) => {
  const [role, setRole] = useState<Roles>(Roles.UNAUTHORISED);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
