import coinsReducer, {
  fetchCoinsPending,
  fetchCoinsFulfilled,
  fetchCoinsRejected,
} from "../coins/slice";
import {
  selectCoins,
  selectCoinsLoading,
  selectCoinsError,
  selectCoinsLastUpdated,
} from "../coins/selectors";

describe("coins slice", () => {
  const initialState = {
    entities: {},
    loading: false,
    error: null,
    lastUpdated: null,
  };

  it("should handle fetchCoinsPending", () => {
    const state = coinsReducer(initialState, fetchCoinsPending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle fetchCoinsFulfilled", () => {
    const payload = { bitcoin: { id: "bitcoin", price: 100 } };
    const state = coinsReducer(initialState, fetchCoinsFulfilled(payload));
    expect(state.entities).toEqual(payload);
    expect(state.loading).toBe(false);
    expect(state.lastUpdated).not.toBeNull();
  });

  it("should handle fetchCoinsRejected", () => {
    const error = "API error";
    const state = coinsReducer(initialState, fetchCoinsRejected(error));
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it("selectors work", () => {
    const state = {
      coins: {
        entities: { bitcoin: { id: "bitcoin" } },
        loading: true,
        error: "err",
        lastUpdated: 123,
      },
    };
    expect(selectCoins(state)).toEqual({ bitcoin: { id: "bitcoin" } });
    expect(selectCoinsLoading(state)).toBe(true);
    expect(selectCoinsError(state)).toBe("err");
    expect(selectCoinsLastUpdated(state)).toBe(123);
  });
});
