import { X, Mail, Lock, User, AlertCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { register } from "../../auth/authSlice";

import { cn } from "@/shared/utils/cn";
import { useAppDispatch } from "@/store/store";

type RegisterModalProps = {
  onClose: () => void;
  onSwitchToLogin: () => void;
};

export function RegisterModal({
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state: { auth: any }) => state.auth,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // Close modal when authentication succeeds
  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (password.length < 6) {
      setLocalError("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Hasła nie są identyczne");
      return;
    }

    dispatch(register({ email, password, name }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-md rounded-xl border shadow-2xl",
          "bg-surface border-border",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between p-6 border-b",
            "border-border",
          )}
        >
          <h2 className={cn("text-2xl font-bold", "text-text-primary")}>
            Zarejestruj się
          </h2>
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-lg transition-colors hover:bg-hover",
              "text-text-secondary",
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {(localError || error) && (
            <div className="flex items-center gap-2 p-3 rounded-lg border bg-destructive/10 border-destructive text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{localError || error}</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Imię i nazwisko
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                placeholder="Jan Kowalski"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                placeholder="twoj@email.pl"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Hasło
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                placeholder="••••••••"
              />
            </div>
            <p className="text-xs mt-1 text-muted-foreground">
              Minimum 6 znaków
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Potwierdź hasło
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                placeholder="••••••••"
              />
            </div>
            {password && confirmPassword && password === confirmPassword && (
              <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                <Check className="w-3 h-3" />
                <span>Hasła są identyczne</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          >
            {loading ? "Rejestrowanie..." : "Zarejestruj się"}
          </button>

          {/* Switch to Login */}
          <div className="text-center text-sm text-muted-foreground">
            <span>Masz już konto? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold transition-colors hover:opacity-80 text-primary"
            >
              Zaloguj się
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
