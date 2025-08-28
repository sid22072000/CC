import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHolding, removeHolding } from "../state/portfolio/slice";
import { setTheme, toggleTheme } from "../state/theme/slice";
import { selectCoins } from "../state/coins/selectors";
import { fetchCoins } from "../state/coins/thunk";
import { selectHoldings } from "../state/portfolio/selectors";
import { selectThemeMode } from "../state/theme/selectors";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const PortfolioPage = React.memo(() => {
  const dispatch = useDispatch();
  const coins = useSelector(selectCoins);
  const holdings = useSelector(selectHoldings);
  const themeMode = useSelector(selectThemeMode);

  const { register, handleSubmit, reset, watch } = useForm();
  const [selectedCoin, setSelectedCoin] = useState("");

  // Calculate total value and 24h change
  const { totalValue, totalChange } = useMemo(() => {
    let value = 0;
    let change = 0;
    Object.entries(holdings).forEach(([coinId, amount]) => {
      const coin = coins[coinId];
      if (coin) {
        value += coin.current_price * amount;
        change +=
          (coin.price_change_percentage_24h / 100) *
          coin.current_price *
          amount;
      }
    });
    return {
      totalValue: value,
      totalChange: value ? (change / value) * 100 : 0,
    };
  }, [holdings, coins]);

  const onSubmit = (data) => {
    const coinId = data.coinId;
    const newAmount = parseFloat(data.amount);
    const existingAmount = holdings[coinId] || 0;
    dispatch(setHolding({ coinId, amount: existingAmount + newAmount }));
    setSelectedCoin("");
    reset();
  };

  const handleUpdate = (coinId) => {
    if (!coinId) return;
    const coin = coins[coinId];
    if (!coin) return;
    setSelectedCoin(coinId);
    reset({ coinId, amount: holdings[coinId] });
  };

  // Prepare chart data for portfolio value trend (placeholder, real data would require time series)
  const chartData = [
    { name: "24h Ago", value: totalValue * (1 - totalChange / 100) },
    { name: "Now", value: totalValue },
  ];

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
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: theme.palette.background.default,
          pb: 6,
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            mt: 0,
            pt: 0,
            background: theme.palette.background.default,
          }}
        >
          <Paper sx={{ p: 3, mb: 4 }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                marginBottom: 16,
                display: "flex",
                gap: 16,
              }}
            >
              <Select
                label="Coin Name"
                value={selectedCoin}
                {...register("coinId", { required: true })}
                sx={{ flex: 1, background: "#fff" }}
                displayEmpty
                inputProps={{ "aria-label": "Coin Name" }}
                onChange={(e) => {
                  setSelectedCoin(e.target.value);
                  register("coinId").onChange(e);
                }}
              >
                <MenuItem value="" disabled>
                  Select Coin
                </MenuItem>
                {Object.values(coins).map((coin) => (
                  <MenuItem key={coin.id} value={coin.id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        style={{
                          borderRadius: "50%",
                          marginRight: 8,
                        }}
                      />
                      <span>
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Amount"
                type="number"
                {...register("amount", {
                  required: true,
                  validate: (value) => value !== "" && !isNaN(value),
                })}
                sx={{ flex: 1 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ height: 56 }}
                disabled={Number(watch("amount")) <= 0}
              >
                Add
              </Button>
            </form>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 2, borderRadius: 3, overflow: "hidden", mt: 2 }}
            >
              <Table sx={{ minWidth: 700 }}>
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
                        textAlign: "center",
                      }}
                    >
                      Count
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
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: themeMode === "dark" ? "#90caf9" : "#222",
                        textAlign: "center",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(holdings).map(([coinId, amount], idx) => {
                    const coin = coins[coinId];
                    if (!coin) return null;
                    return (
                      <TableRow
                        key={coinId}
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
                            textAlign: "center",
                          }}
                        >
                          {amount}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 500,
                            color: themeMode === "dark" ? "#e3e3e3" : "#222",
                          }}
                        >
                          ${(coin.current_price * amount).toLocaleString()}
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
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              color="primary"
                              variant="outlined"
                              size="small"
                              sx={{ borderRadius: 2 }}
                              onClick={() => handleUpdate(coinId)}
                            >
                              Update
                            </Button>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              sx={{ borderRadius: 2 }}
                              onClick={() => dispatch(removeHolding(coinId))}
                            >
                              Remove
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h5">
                  <strong>Total Portfolio Value:</strong> $
                  {totalValue.toLocaleString()}
                </Typography>
                <Typography
                  variant="h6"
                  color={totalChange > 0 ? "green" : "red"}
                >
                  <strong>24h Change:</strong> {totalChange.toFixed(2)}%
                </Typography>
              </Box>
              <Box sx={{ width: 300, height: 150 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={["auto", "auto"]} />
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1976d2"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
});

export default PortfolioPage;
