import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  theme: "light" | "dark";
};

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    document.documentElement.setAttribute("data-theme", saved);
    return saved;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    return "dark";
  }
  document.documentElement.setAttribute("data-theme", "dark");
  return "dark";
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      document.documentElement.setAttribute("data-theme", action.payload);
    },
    toggleTheme(state) {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const selectTheme = (state: { theme: ThemeState }) => state.theme;
export default themeSlice.reducer;
