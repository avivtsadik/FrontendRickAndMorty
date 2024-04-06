import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { RouteValues } from "./utils/generalEnums";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./context/userContext/userProvider";
import AuthGuard from "./Guards/AuthGuard";
import NavBar from "./components/navbar";
import { SnackbarProvider } from "notistack";

function App() {
  const queryClient = new QueryClient();

  return (
    <SnackbarProvider maxSnack={3}>
      <UserProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route element={<AuthGuard />}>
                  <Route element={<NavBar />}>
                    <Route path={RouteValues.HOME_PAGE} element={<Home />} />
                  </Route>
                </Route>
                <Route path={RouteValues.LOGIN_PAGE} element={<Login />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;
