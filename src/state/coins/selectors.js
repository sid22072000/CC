// Coin selectors
export const selectCoins = (state) => state.coins.entities;
export const selectCoinsLoading = (state) => state.coins.loading;
export const selectCoinsError = (state) => state.coins.error;
export const selectCoinsLastUpdated = (state) => state.coins.lastUpdated;
