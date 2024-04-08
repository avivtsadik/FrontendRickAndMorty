import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Roles, RouteValues } from "../utils/generalEnums";
import { useUserContext } from "../context/userContext/userContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { role, setRole } = useUserContext();
  const handleLogout = React.useCallback(() => {
    setRole(Roles.UNAUTHORISED);
    navigate(RouteValues.LOGIN_PAGE);
  }, [navigate, setRole]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Rick And Morty
            </Typography>
            <Button
              sx={{ ml: 2, textTransform: "none" }}
              color="inherit"
              onClick={handleLogout}
            >
              Logout - ({role})
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};
export default NavBar;
