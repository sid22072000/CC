import { createSlice } from "@reduxjs/toolkit";
import { fetchCoins } from "./thunk";

const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    entities: {},
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    fetchCoinsPending(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCoinsFulfilled(state, action) {
      state.entities = action.payload;
      state.loading = false;
      state.lastUpdated = Date.now();
    },
    fetchCoinsRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCoinsPending, fetchCoinsFulfilled, fetchCoinsRejected } =
  coinsSlice.actions;
export default coinsSlice.reducer;
