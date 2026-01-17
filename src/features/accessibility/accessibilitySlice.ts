import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type AccessibilityState = {
  highContrast: boolean;
  fontSize: "normal" | "large" | "extra-large";
};

function getInitialAccessibility(): AccessibilityState {
  const saved = localStorage.getItem("accessibility");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      /* empty */
    }
  }
  return {
    highContrast: false,
    fontSize: "normal",
  };
}

const initialState: AccessibilityState = getInitialAccessibility();

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setHighContrast(state, action: PayloadAction<boolean>) {
      state.highContrast = action.payload;
      localStorage.setItem("accessibility", JSON.stringify(state));
      if (action.payload) {
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("high-contrast");
      }
    },
    setFontSize(
      state,
      action: PayloadAction<"normal" | "large" | "extra-large">,
    ) {
      state.fontSize = action.payload;
      localStorage.setItem("accessibility", JSON.stringify(state));
      document.documentElement.classList.remove(
        "font-normal",
        "font-large",
        "font-extra-large",
      );
      document.documentElement.classList.add(`font-${action.payload}`);
    },
    setAccessibility(
      state,
      action: PayloadAction<Partial<AccessibilityState>>,
    ) {
      Object.assign(state, action.payload);
      localStorage.setItem("accessibility", JSON.stringify(state));
      // Apply classes
      if (action.payload.highContrast !== undefined) {
        if (action.payload.highContrast) {
          document.documentElement.classList.add("high-contrast");
        } else {
          document.documentElement.classList.remove("high-contrast");
        }
      }
      if (action.payload.fontSize) {
        document.documentElement.classList.remove(
          "font-normal",
          "font-large",
          "font-extra-large",
        );
        document.documentElement.classList.add(
          `font-${action.payload.fontSize}`,
        );
      }
    },
  },
});

export const { setHighContrast, setFontSize, setAccessibility } =
  accessibilitySlice.actions;
export const selectAccessibility = (state: {
  accessibility: AccessibilityState;
}) => state.accessibility;
export default accessibilitySlice.reducer;
