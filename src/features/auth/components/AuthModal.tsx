import { X, Mail, Lock, User, AlertCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { login, register } from "@/features/auth/authSlice";
import { cn } from "@/shared/utils/cn";
import { selectAuth, useAppDispatch } from "@/store/store";

type AuthModalProps = {
  onClose: () => void;
  initialTab?: "login" | "register";
};

export function AuthModal({ onClose, initialTab = "login" }: AuthModalProps) {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useSelector(selectAuth);
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);

  // Close modal when authentication succeeds
  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [_loginError, setLoginError] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    if (registerPassword.length < 6) {
      setRegisterError("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Hasła nie są identyczne");
      return;
    }

    dispatch(
      register({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
      }),
    );
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
          "relative w-full max-w-md rounded-xl border shadow-2xl bg-surface border-border",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between p-6 border-b border-border",
          )}
        >
          <h2 className={cn("text-2xl font-bold text-text-primary")}>
            {activeTab === "login" ? "Zaloguj się" : "Zarejestruj się"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-hover"
            style={{ color: "var(--text-secondary)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => {
              setActiveTab("login");
              setLoginError("");
              setRegisterError("");
            }}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-semibold transition-all relative",
              activeTab === "login" ? "text-primary" : "text-text-secondary",
            )}
          >
            Zaloguj się
            {activeTab === "login" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setLoginError("");
              setRegisterError("");
            }}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-semibold transition-all relative",
              activeTab === "register" ? "text-primary" : "text-text-secondary",
            )}
          >
            Zarejestruj się
            {activeTab === "register" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg border bg-destructive/10 border-destructive text-destructive">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-6 h-6 text-muted-foreground" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                    placeholder="twoj@email.pl"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-foreground">
                    Hasło
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium transition-colors hover:opacity-80 text-primary"
                  >
                    Zapomniałeś hasła?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-6 h-6 text-muted-foreground" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
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
              <div className="text-center text-sm pt-2 text-muted-foreground">
                <span>Nie masz konta? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="font-semibold transition-colors hover:opacity-80 text-primary"
                >
                  Zarejestruj się tutaj
                </button>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              {registerError && (
                <div className="flex items-center gap-2 p-3 rounded-lg border bg-destructive/10 border-destructive text-destructive">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{registerError}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Imię i nazwisko
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-6 h-6 text-muted-foreground" />
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                    placeholder="Jan Kowalski"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-6 h-6 text-muted-foreground" />
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                    placeholder="twoj@email.pl"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Hasło
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-6 h-6 text-muted-foreground" />
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
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
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-6 h-6 text-muted-foreground" />
                  <input
                    type="password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border text-foreground focus:ring-ring"
                    placeholder="••••••••"
                  />
                </div>
                {registerPassword &&
                  registerConfirmPassword &&
                  registerPassword === registerConfirmPassword && (
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
              <div className="text-center text-sm pt-2 text-muted-foreground">
                <span>Masz już konto? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="font-semibold transition-colors hover:opacity-80 text-primary"
                >
                  Zaloguj się tutaj
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
