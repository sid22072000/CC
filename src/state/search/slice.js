import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    filter: {
      top: 10,
      priceChange: "all", // 'positive', 'negative', 'all'
    },
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { setQuery, setFilter } = searchSlice.actions;
export default searchSlice.reducer;
