import { configureStore } from "@reduxjs/toolkit";
// ...import slices here...

import coinsReducer from "./state/coins/slice";
import searchReducer from "./state/search/slice";
import portfolioReducer from "./state/portfolio/slice";
import themeReducer from "./state/theme/slice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    search: searchReducer,
    portfolio: portfolioReducer,
    theme: themeReducer,
  },
});
