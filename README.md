# Crypto Portfolio Dashboard

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server
4. Run `npm run test` to execute unit tests

## Redux Architecture

The application uses Redux Toolkit for all state management, ensuring a predictable and scalable architecture. Key points:

- **Slices**: Each domain (coins, portfolio, search, theme) has its own slice in `src/state/[slice]/slice.js`, containing state, reducers, and actions.
- **Selectors**: All selectors are defined in `src/state/[slice]/selectors.js` for easy and efficient state access throughout the app.
- **Thunks**: Async logic (API calls) is handled in `src/state/[slice]/thunk.js` using `createAsyncThunk`. Components never call APIs directly; they dispatch thunks.
- **State Normalization**: Coin data is stored as an object keyed by coin ID for fast lookup and efficient updates.
- **Single Source of Truth**: All UI and business logic reads from Redux state, ensuring consistency and easy debugging.
- **Testing**: Slices and selectors are covered by unit tests in `src/state/__tests__`.

## API Usage Details

The app integrates with the [CoinGecko API](https://docs.coingecko.com/v3.0.1/) to fetch real-time cryptocurrency data. Details:

- **Endpoints Used**: The Redux thunks fetch coin market data, prices, and metadata from CoinGecko's `/coins/markets` endpoint.
- **Data Flow**: Thunks dispatch actions to update Redux state with the latest coin data, loading status, and errors.
- **Auto-Refresh**: Coin data is automatically refreshed every 30 seconds via a global interval, keeping the dashboard and portfolio up-to-date.
- **Error Handling**: API errors are caught in thunks and stored in Redux state, allowing the UI to display alerts or fallback states.
- **No Direct API Calls in Components**: All API logic is centralized in Redux thunks for maintainability and testability.

---

For more details, see the code and comments in each slice/component.
