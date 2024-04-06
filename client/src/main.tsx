import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./components/lib/react-query/queryClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
    <QueryClientProvider client={queryClient}>

      <App />
</QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
