import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    holdings: {}, // { coinId: amount }
  },
  reducers: {
    setHolding(state, action) {
      const { coinId, amount } = action.payload;
      state.holdings[coinId] = amount;
    },
    removeHolding(state, action) {
      delete state.holdings[action.payload];
    },
  },
});

export const { setHolding, removeHolding } = portfolioSlice.actions;
export default portfolioSlice.reducer;
