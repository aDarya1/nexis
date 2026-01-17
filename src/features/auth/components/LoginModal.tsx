import { X, Mail, Lock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { login } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/store";

type LoginModalProps = {
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export function LoginModal({ onClose, onSwitchToRegister }: LoginModalProps) {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state: any) => state.auth,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Close modal when authentication succeeds
  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
        className="relative w-full max-w-md rounded-xl border shadow-2xl bg-surface border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Zaloguj się</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-accent"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg border bg-destructive/10 border-destructive text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

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
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>

          {/* Switch to Register */}
          <div className="text-center text-sm text-muted-foreground">
            <span>Nie masz konta? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-semibold transition-colors hover:opacity-80 text-primary"
            >
              Zarejestruj się
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
