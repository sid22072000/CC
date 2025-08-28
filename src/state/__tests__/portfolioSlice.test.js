import portfolioReducer, {
  setHolding,
  removeHolding,
} from "../portfolio/slice";
import { selectHoldings } from "../portfolio/selectors";

describe("portfolio slice", () => {
  const initialState = { holdings: {} };

  it("should handle setHolding", () => {
    const state = portfolioReducer(
      initialState,
      setHolding({ coinId: "bitcoin", amount: 2 })
    );
    expect(state.holdings.bitcoin).toBe(2);
  });

  it("should handle removeHolding", () => {
    const state = portfolioReducer(
      { holdings: { bitcoin: 2 } },
      removeHolding("bitcoin")
    );
    expect(state.holdings.bitcoin).toBeUndefined();
  });

  it("selector works", () => {
    const state = { portfolio: { holdings: { bitcoin: 2 } } };
    expect(selectHoldings(state)).toEqual({ bitcoin: 2 });
  });
});
