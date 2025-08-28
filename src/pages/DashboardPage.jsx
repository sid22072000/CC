import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoins } from "../state/coins/thunk";
import { setQuery, setFilter } from "../state/search/slice";
import { setTheme, toggleTheme } from "../state/theme/slice";
import {
  selectCoins,
  selectCoinsLoading,
  selectCoinsError,
  selectCoinsLastUpdated,
} from "../state/coins/selectors";
import { selectQuery, selectFilter } from "../state/search/selectors";
import { selectThemeMode } from "../state/theme/selectors";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const DashboardPage = React.memo(() => {
  const dispatch = useDispatch();
  const coins = useSelector(selectCoins);
  const loading = useSelector(selectCoinsLoading);
  const error = useSelector(selectCoinsError);
  const lastUpdated = useSelector(selectCoinsLastUpdated);
  const query = useSelector(selectQuery);
  const filter = useSelector(selectFilter);
  const themeMode = useSelector(selectThemeMode);

  // Search/filter logic
  const filteredCoins = Object.values(coins).filter((coin) => {
    const matchesQuery =
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase());
    const matchesTop =
      filter.top === 10
        ? coin.market_cap_rank <= 10
        : coin.market_cap_rank <= 50;
    const matchesChange =
      filter.priceChange === "all"
        ? true
        : filter.priceChange === "positive"
        ? coin.price_change_percentage_24h > 0
        : coin.price_change_percentage_24h < 0;
    return matchesQuery && matchesTop && matchesChange;
  });

  const handleQueryChange = useCallback(
    (e) => {
      dispatch(setQuery(e.target.value));
    },
    [dispatch]
  );

  const handleTopChange = useCallback(
    (_, value) => {
      dispatch(setFilter({ top: value }));
    },
    [dispatch]
  );

  const handleChangeFilter = useCallback(
    (_, value) => {
      dispatch(setFilter({ priceChange: value }));
    },
    [dispatch]
  );

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
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4 }}>
        <Paper
          sx={{
            p: 3,
            mb: 4,
            boxShadow:
              themeMode === "dark"
                ? "0 4px 24px rgba(25, 118, 210, 0.12)"
                : "0 4px 24px rgba(25, 118, 210, 0.08)",
            borderRadius: 3,
            background: themeMode === "dark" ? "#23272f" : "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 2,
            }}
          >
            <TextField
              label="Search"
              value={query}
              onChange={handleQueryChange}
              sx={{ flex: 1, minWidth: { xs: "100%", sm: 0 } }}
              InputProps={{
                sx: {
                  height: { xs: 48, sm: 40 },
                  fontSize: { xs: "1rem", sm: "inherit" },
                },
              }}
            />
            <ToggleButtonGroup
              value={filter.top}
              exclusive
              onChange={handleTopChange}
              sx={{ width: { xs: "100%", sm: "auto" }, mb: { xs: 1, sm: 0 } }}
            >
              <ToggleButton
                value={10}
                sx={{
                  fontSize: { xs: "0.95rem", sm: "inherit" },
                  py: { xs: 1.2, sm: 0.5 },
                }}
              >
                Top 10
              </ToggleButton>
              <ToggleButton
                value={50}
                sx={{
                  fontSize: { xs: "0.95rem", sm: "inherit" },
                  py: { xs: 1.2, sm: 0.5 },
                }}
              >
                Top 50
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={filter.priceChange}
              exclusive
              onChange={handleChangeFilter}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <ToggleButton
                value="all"
                sx={{
                  fontSize: { xs: "0.95rem", sm: "inherit" },
                  py: { xs: 1.2, sm: 0.5 },
                }}
              >
                All
              </ToggleButton>
              <ToggleButton
                value="positive"
                sx={{
                  fontSize: { xs: "0.95rem", sm: "inherit" },
                  py: { xs: 1.2, sm: 0.5 },
                }}
              >
                Positive 24h
              </ToggleButton>
              <ToggleButton
                value="negative"
                sx={{
                  fontSize: { xs: "0.95rem", sm: "inherit" },
                  py: { xs: 1.2, sm: 0.5 },
                }}
              >
                Negative 24h
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {loading && (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 2,
              borderRadius: 3,
              overflow: "auto",
              mt: 2,
              width: "100%",
              maxWidth: "100vw",
            }}
          >
            <Table sx={{ minWidth: 900, width: "100%" }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor:
                      themeMode === "dark" ? "#23272f" : "#f5f5f5",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                      textAlign: "center",
                      minWidth: 120,
                      verticalAlign: "middle",
                      p: 0,
                      color: themeMode === "dark" ? "#90caf9" : "#222",
                    }}
                  >
                    Logo
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: themeMode === "dark" ? "#90caf9" : "#222",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: themeMode === "dark" ? "#90caf9" : "#222",
                    }}
                  >
                    Symbol
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: themeMode === "dark" ? "#90caf9" : "#222",
                    }}
                  >
                    Price (USD)
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                      textAlign: "center",
                      minWidth: 120,
                      verticalAlign: "middle",
                      p: 0,
                      color: themeMode === "dark" ? "#90caf9" : "#222",
                    }}
                  >
                    24h %
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: themeMode === "dark" ? "#90caf9" : "#222",
                    }}
                  >
                    Market Cap
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins.map((coin, idx) => (
                  <TableRow
                    key={coin.id}
                    sx={{
                      backgroundColor:
                        themeMode === "dark"
                          ? idx % 2 === 0
                            ? "#23272f"
                            : "#181a20"
                          : idx % 2 === 0
                          ? "#fafafa"
                          : "#fff",
                      transition: "background 0.2s",
                      "&:hover": {
                        backgroundColor:
                          themeMode === "dark" ? "#1976d2" : "#e3f2fd",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: themeMode === "dark" ? "#e3e3e3" : "#222",
                        p: 1,
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        <img
                          src={coin.image}
                          alt={coin.name}
                          width={32}
                          style={{
                            borderRadius: "50%",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            display: "block",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        color: themeMode === "dark" ? "#e3e3e3" : "#222",
                      }}
                    >
                      {coin.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        color: themeMode === "dark" ? "#e3e3e3" : "#222",
                      }}
                    >
                      {coin.symbol.toUpperCase()}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        color: themeMode === "dark" ? "#e3e3e3" : "#222",
                      }}
                    >
                      ${coin.current_price.toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        color:
                          coin.price_change_percentage_24h > 0
                            ? "#4caf50"
                            : "#f44336",
                        textAlign: "center",
                        verticalAlign: "middle",
                        p: 0,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        {coin.price_change_percentage_24h > 0 ? (
                          <TrendingUpIcon fontSize="small" />
                        ) : (
                          <TrendingDownIcon fontSize="small" />
                        )}
                        <span style={{ marginLeft: 4 }}>
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        color: themeMode === "dark" ? "#e3e3e3" : "#222",
                      }}
                    >
                      ${coin.market_cap.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              marginTop: 2,
              fontSize: 14,
              textAlign: "right",
              color: "text.secondary",
            }}
          >
            Last updated:{" "}
            {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Never"}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
});

export default DashboardPage;
