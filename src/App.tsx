import { Routes, Route, Navigate } from "react-router-dom";
import { Frame } from "./components/Frame";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import { QuizListPage } from "./pages/QuizListPage";
import { LoginPage } from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
      },
    },
  });
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Frame />}>
            <Route path="/quiz" element={<QuizListPage />} />
            <Route path="/quiz/:id" element={<div>detail</div>} />
            <Route path="*" element={<Navigate to="/quiz" replace />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
