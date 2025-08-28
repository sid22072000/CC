import themeReducer, { toggleTheme, setTheme } from "../theme/slice";
import { selectThemeMode } from "../theme/selectors";

describe("theme slice", () => {
  const initialState = { mode: "light" };

  it("should handle toggleTheme", () => {
    const state = themeReducer(initialState, toggleTheme());
    expect(state.mode).toBe("dark");
    const state2 = themeReducer(state, toggleTheme());
    expect(state2.mode).toBe("light");
  });

  it("should handle setTheme", () => {
    const state = themeReducer(initialState, setTheme("dark"));
    expect(state.mode).toBe("dark");
  });

  it("selector works", () => {
    const state = { theme: { mode: "dark" } };
    expect(selectThemeMode(state)).toBe("dark");
  });
});
