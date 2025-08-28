import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import DashboardPage from "./pages/DashboardPage";
import PortfolioPage from "./pages/PortfolioPage";
import { Navbar, Footer } from "./components/Layout";
import { Box } from "@mui/system";

function App() {
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "dark"
        ? {
            background: {
              default: "#181a20",
              paper: "#23272f",
            },
            primary: { main: "#1976d2" },
            secondary: { main: "#90caf9" },
            text: {
              primary: "#e3e3e3",
              secondary: "#b0b0b0",
            },
          }
        : {
            background: {
              default: "#f5f5f5",
              paper: "#fff",
            },
            primary: { main: "#1976d2" },
            secondary: { main: "#1565c0" },
            text: {
              primary: "#222",
              secondary: "#555",
            },
          }),
    },
    typography: {
      fontFamily: "Inter, Roboto, Arial, sans-serif",
      fontWeightRegular: 500,
      fontWeightBold: 900,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              themeMode === "dark"
                ? "0 4px 24px rgba(25, 118, 210, 0.12)"
                : "0 4px 24px rgba(25, 118, 210, 0.08)",
            background: themeMode === "dark" ? "#23272f" : "#fff",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Inter, Roboto, Arial, sans-serif",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          minHeight: "calc(100vh - 56px)", // Remove extra height for unified layout
          pt: 4, // Add padding from top for unified layout
          pb: 4, // 32px bottom padding for unified layout
          background: theme.palette.background.default,
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
