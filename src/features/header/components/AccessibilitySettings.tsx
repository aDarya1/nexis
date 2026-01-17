import { Settings, Contrast, Type, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAccessibility,
  setAccessibility,
} from "@/features/accessibility/accessibilitySlice";
import { cn } from "@/shared/utils/cn";

/**
 * Komponent ustawień dostępności
 * Zawiera opcje trybu wysokiego kontrastu i zwiększonego rozmiaru czcionki
 */
export function AccessibilitySettings() {
  const accessibility = useSelector(selectAccessibility);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Apply initial classes on mount
  useEffect(() => {
    if (accessibility.highContrast) {
      document.documentElement.classList.add("high-contrast");
    }
    document.documentElement.classList.add(`font-${accessibility.fontSize}`);
  }, [accessibility.highContrast, accessibility.fontSize]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2.5 rounded-xl transition-all hover:scale-110 border flex items-center gap-2",
          "border-border hover:bg-accent",
        )}
        title="Ustawienia dostępności"
        aria-label="Otwórz ustawienia dostępności"
      >
        <Settings className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium hidden md:inline text-foreground">
          Dostępność
        </span>
      </button>

      {isOpen && (
        <>
          {/* Overlay do zamknięcia menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu ustawień */}
          <div
            className={cn(
              "absolute left-[-160px] sm:right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-50 p-4 space-y-4",
              "bg-card",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">
                Ustawienia dostępności
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-muted transition-colors"
                aria-label="Zamknij menu dostępności"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Tryb wysokiego kontrastu */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Contrast className="w-5 h-5 text-primary" />
                <label className="text-sm font-medium text-card-foreground">
                  Tryb wysokiego kontrastu
                </label>
              </div>
              <p className="text-xs mb-3 text-muted-foreground">
                Zwiększa kontrast kolorów dla lepszej czytelności (zgodność z
                WCAG AAA)
              </p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={accessibility.highContrast}
                  onChange={(e) =>
                    dispatch(
                      setAccessibility({ highContrast: e.target.checked }),
                    )
                  }
                  className="w-5 h-5 bg-muted border-2 border-muted-foreground rounded checked:bg-primary checked:border-primary transition-all"
                />
                <span className="text-sm text-muted-foreground">
                  {accessibility.highContrast ? "Włączone" : "Wyłączone"}
                </span>
              </label>
            </div>

            {/* Rozmiar czcionki */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Type className="w-5 h-5 text-primary" />
                <label className="text-sm font-medium text-card-foreground">
                  Rozmiar czcionki
                </label>
              </div>
              <p className="text-xs mb-3 text-muted-foreground">
                Zwiększ rozmiar czcionki dla lepszej czytelności
              </p>
              <div className="flex gap-2">
                {(["normal", "large", "extra-large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      dispatch(setAccessibility({ fontSize: size }))
                    }
                    className={cn(
                      "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                      accessibility.fontSize === size
                        ? "bg-primary/20 text-primary border border-primary"
                        : "bg-muted text-muted-foreground border border-border hover:border-muted-foreground",
                    )}
                  >
                    {size === "normal"
                      ? "Normalny"
                      : size === "large"
                        ? "Duży"
                        : "Bardzo duży"}
                  </button>
                ))}
              </div>
            </div>

            {/* Informacja o zgodności */}
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Zgodne z WCAG 2.1 AA/AAA
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
