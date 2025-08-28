import axios from "axios";
import {
  fetchCoinsPending,
  fetchCoinsFulfilled,
  fetchCoinsRejected,
} from "./slice";

export const fetchCoins = () => async (dispatch) => {
  dispatch(fetchCoinsPending());
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      }
    );
    // Normalize coins by id
    const coinsById = {};
    response.data.forEach((coin) => {
      coinsById[coin.id] = coin;
    });
    dispatch(fetchCoinsFulfilled(coinsById));
  } catch (error) {
    dispatch(fetchCoinsRejected(error.response?.data || error.message));
  }
};
