import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Link as MuiLink,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoins } from "../state/coins/thunk";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { toggleTheme } from "../state/theme/slice";

export const Navbar = () => {
  const location = useLocation();
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCoins());
    const interval = setInterval(() => {
      dispatch(fetchCoins());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        boxShadow: 4,
        borderRadius: 0,
        background:
          themeMode === "dark"
            ? "linear-gradient(90deg, #23272f 0%, #181a20 100%)"
            : "linear-gradient(90deg, #1976d2 0%, #0d47a1 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 56, sm: 64, md: 72 }, px: { xs: 0.5, sm: 2 } }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: { xs: 32, sm: 36, md: 40 },
                height: { xs: 32, sm: 36, md: 40 },
                marginRight: { xs: 0.5, sm: 1, md: 1 },
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                background: themeMode === "dark" ? "#23272f" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Simple Bitcoin SVG icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
              >
                <circle cx="16" cy="16" r="16" fill="#F7931A" />
                <path
                  d="M16 8v16M12 12h8M12 20h8"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: 1,
                color: themeMode === "dark" ? "#e3e3e3" : "#fff",
                fontSize: { xs: "1.1rem", sm: "1.3rem", md: "2rem" },
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: { xs: "none", sm: "block" },
              }}
            >
              Crypto Coin
            </Typography>
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: 1,
                color: themeMode === "dark" ? "#e3e3e3" : "#fff",
                fontSize: "1.1rem",
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: { xs: "block", sm: "none" },
              }}
            >
              CC
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Button
              color={
                location.pathname === "/dashboard" ? "secondary" : "inherit"
              }
              component={Link}
              to="/dashboard"
              sx={{
                fontWeight: 700,
                mx: { xs: 0.5, sm: 1 },
                px: { xs: 1.5, sm: 2, md: 3 },
                borderRadius: 3,
                minWidth: { xs: 60, sm: 90 },
                fontSize: { xs: "0.85rem", sm: "1rem" },
                bgcolor:
                  location.pathname === "/dashboard"
                    ? themeMode === "dark"
                      ? "#23272f"
                      : "#fff"
                    : "transparent",
                color:
                  location.pathname === "/dashboard"
                    ? themeMode === "dark"
                      ? "#90caf9"
                      : "#1976d2"
                    : themeMode === "dark"
                    ? "#e3e3e3"
                    : "#fff",
                boxShadow: location.pathname === "/dashboard" ? 2 : 0,
                transition: "all 0.2s",
              }}
            >
              Dashboard
            </Button>
            <Button
              color={
                location.pathname === "/portfolio" ? "secondary" : "inherit"
              }
              component={Link}
              to="/portfolio"
              sx={{
                fontWeight: 700,
                mx: { xs: 0.5, sm: 1 },
                px: { xs: 1.5, sm: 2, md: 3 },
                borderRadius: 3,
                minWidth: { xs: 60, sm: 90 },
                fontSize: { xs: "0.85rem", sm: "1rem" },
                bgcolor:
                  location.pathname === "/portfolio"
                    ? themeMode === "dark"
                      ? "#23272f"
                      : "#fff"
                    : "transparent",
                color:
                  location.pathname === "/portfolio"
                    ? themeMode === "dark"
                      ? "#90caf9"
                      : "#1976d2"
                    : themeMode === "dark"
                    ? "#e3e3e3"
                    : "#fff",
                boxShadow: location.pathname === "/portfolio" ? 2 : 0,
                transition: "all 0.2s",
              }}
            >
              Portfolio
            </Button>
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              color="inherit"
              sx={{ ml: { xs: 1, sm: 2 } }}
            >
              {themeMode === "dark" ? (
                <Brightness7Icon sx={{ color: "#ffd600" }} />
              ) : (
                <Brightness4Icon sx={{ color: "#23272f" }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export const Footer = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  return (
    <Box
      className="footer"
      sx={{
        mt: { xs: 3, sm: 6 },
        py: { xs: 0.7, sm: 1.2 },
        px: { xs: 1, sm: 2 },
        bgcolor: themeMode === "dark" ? "#23272f" : "#fff",
        textAlign: "center",
        color: themeMode === "dark" ? "#e3e3e3" : "text.secondary",
        boxShadow: "0 -2px 8px rgba(25, 118, 210, 0.08)",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        transition: "background 0.3s, color 0.3s",
        fontSize: { xs: "0.8rem", sm: "1rem" },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{
            color: themeMode === "dark" ? "#e3e3e3" : "text.secondary",
          }}
        >
          &copy; {new Date().getFullYear()} Crypto Portfolio Dashboard —
          Siddhant
        </Typography>
      </Container>
    </Box>
  );
};
