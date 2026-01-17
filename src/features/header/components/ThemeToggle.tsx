import { Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import {
  toggleTheme,
  selectTheme,
} from "@/features/header/components/themeSlice";

export function ThemeToggle() {
  const theme = useSelector(selectTheme).theme;
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2.5 rounded-xl transition-all hover:scale-110 border bg-accent border-border text-primary"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
