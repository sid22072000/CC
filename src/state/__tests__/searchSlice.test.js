import searchReducer, { setQuery, setFilter } from "../search/slice";
import { selectQuery, selectFilter } from "../search/selectors";

describe("search slice", () => {
  const initialState = {
    query: "",
    filter: { top: 10, priceChange: "all" },
  };

  it("should handle setQuery", () => {
    const state = searchReducer(initialState, setQuery("btc"));
    expect(state.query).toBe("btc");
  });

  it("should handle setFilter", () => {
    const state = searchReducer(initialState, setFilter({ top: 50 }));
    expect(state.filter.top).toBe(50);
  });

  it("selectors work", () => {
    const state = {
      search: { query: "btc", filter: { top: 10, priceChange: "all" } },
    };
    expect(selectQuery(state)).toBe("btc");
    expect(selectFilter(state)).toEqual({ top: 10, priceChange: "all" });
  });
});
