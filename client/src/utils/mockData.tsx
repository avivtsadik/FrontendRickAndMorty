import { Roles } from "./generalEnums";

export const UsersMap = new Map<Roles,string>([
    [Roles.ADMIN, "admin"],
    [Roles.NON_ADMIN, "nonadmin"],
])