import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import useLogin from "./Login.module";

const Login = () => {
  const { LoginUser, usernameRef, passwordRef } = useLogin();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <Box boxShadow={5} sx={{ p: 2 }}>
        <FormControl variant="standard">
          <Typography variant="overline" display="block" gutterBottom>
            Login
          </Typography>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              inputRef={usernameRef}
              id="username-input"
              label="Username"
              variant="standard"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1 }}>
            <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              inputRef={passwordRef}
              id="password-input"
              label="Password"
              variant="standard"
              type="password"
            />
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() =>
              LoginUser(
                usernameRef?.current?.value,
                passwordRef?.current?.value
              )
            }
          >
            Login
          </Button>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default Login;
