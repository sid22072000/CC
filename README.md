# Crypto Portfolio Dashboard

A responsive and interactive crypto portfolio dashboard built with React.js, Redux Toolkit, and Vite.

## Features

- Dashboard: View cryptocurrencies with name, symbol, logo, price, 24h change, and market cap
- Search & Filter: Search by name/symbol, filter by top coins and price change
- Portfolio: Track your holdings, total value, and 24h change
- Real-Time Updates: Auto-refresh prices every 30 seconds
- State Management: All state managed in Redux Toolkit
- Routing: /dashboard and /portfolio routes
- Styling: Material UI
- Error Handling: Centralized in Redux, displayed via toast/alert
- Performance: Optimized state and rendering
- Forms: Portfolio inputs via react-hook-form
- Bonus: Theme toggle, price trend chart, unit tests, deployment

## Setup Instructions

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev` to start the app

## Redux Architecture

- All state (coins, search/filter, portfolio, theme) is managed in Redux slices
- API calls use `createAsyncThunk` and are dispatched from Redux, not components
- State is normalized for coins (object keyed by ID)

## API Usage

- Coin data fetched from [CoinGecko API](https://docs.coingecko.com/v3.0.1/)
- All API logic is in Redux async thunks

## Commit Guidelines

- Use feature-based commits (avoid a single "final commit")

## Deployment

- (Optional) Deploy to Vercel or Netlify and add your live link here

---

For more details, see the code and comments in each slice/component.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
