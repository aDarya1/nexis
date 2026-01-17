import { Search, Bell, LogIn, User, LogOut } from "lucide-react";
import { X, Mic, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/features/auth/authSlice";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { AccessibilitySettings } from "@/features/header/components/AccessibilitySettings";
import { ThemeToggle } from "@/features/header/components/ThemeToggle";
import { NotificationsPanel } from "@/features/notification/components/NotificationsPanel";
import { DateTimeDisplay } from "@/shared/components/DateTimeDisplay";
import { cn } from "@/shared/utils/cn";

type MobileHeaderProps = {
  onMenuClick: () => void;
  onSearch: (query: string) => void;
};

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const notifications = useSelector(
    (state: any) => state.notification.notifications,
  );
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login",
  );
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Stub for publish button
  const onPublish = () => {
    // TODO: Implement publish logic
    alert("Publish action");
  };

  // Zamknij menu użytkownika po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const suggestions = {
    articles: [
      "Quantum Computing Breakthrough",
      "Neural Networks for Protein Folding",
      "Climate Change Modeling 2024",
    ],
    authors: ["Dr. Elena Rodriguez", "Prof. James Chen", "Dr. Maya Thompson"],
    terms: [
      "quantum",
      "machine learning",
      "CRISPR",
      "climate change",
      "artificial intelligence",
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setShowSuggestions(false);
    onSearch(""); // Wyczyść wyszukiwanie i pokaż wszystkie artykuły
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Simulate voice input
    setTimeout(() => {
      setSearchValue("quantum computing");
      setIsListening(false);
    }, 2000);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    setAuthModalTab("login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 bg-surface border-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
            <span className="text-lg font-bold text-primary-foreground">N</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            NEXIS
          </h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8 hidden sm:flex">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => searchValue && setShowSuggestions(true)}
              placeholder="Search papers, authors, topics..."
              className="w-full pl-12 pr-20 py-3 border rounded-xl focus:outline-none transition-all bg-background border-border text-foreground focus:ring-2 focus:ring-ring"
            />
            {/* Clear Button (X) */}
            {searchValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all hover:bg-accent flex items-center justify-center"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all flex items-center justify-center",
                isListening
                  ? "bg-destructive text-destructive-foreground animate-pulse"
                  : "text-muted-foreground",
              )}
              title="Voice search"
              aria-label="Voice search"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Autocomplete Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full mt-2 w-full rounded-xl shadow-2xl z-50 overflow-hidden border bg-popover border-border">
                {/* Articles */}
                {suggestions.articles.some((a) =>
                  a.toLowerCase().includes(searchValue.toLowerCase()),
                ) && (
                  <div className="p-3 border-b border-border">
                    <div className="text-xs uppercase font-semibold mb-2 text-muted-foreground">
                      Articles
                    </div>
                    {suggestions.articles
                      .filter((a) =>
                        a.toLowerCase().includes(searchValue.toLowerCase()),
                      )
                      .map((article, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(article)}
                          className="w-full text-left px-3 py-2 text-sm rounded transition-colors text-popover-foreground hover:bg-accent"
                        >
                          {article}
                        </button>
                      ))}
                  </div>
                )}

                {/* Authors */}
                {suggestions.authors.some((a) =>
                  a.toLowerCase().includes(searchValue.toLowerCase()),
                ) && (
                  <div className="p-3 border-b border-border">
                    <div className="text-xs uppercase font-semibold mb-2 text-muted-foreground">
                      Authors
                    </div>
                    {suggestions.authors
                      .filter((a) =>
                        a.toLowerCase().includes(searchValue.toLowerCase()),
                      )
                      .map((author, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(author)}
                          className="w-full text-left px-3 py-2 text-sm rounded transition-colors text-popover-foreground hover:bg-accent"
                        >
                          {author}
                        </button>
                      ))}
                  </div>
                )}

                {/* Terms */}
                {suggestions.terms.some((t) =>
                  t.toLowerCase().includes(searchValue.toLowerCase()),
                ) && (
                  <div className="p-3">
                    <div className="text-xs uppercase font-semibold mb-2 text-muted-foreground">
                      Popular Terms
                    </div>
                    {suggestions.terms
                      .filter((t) =>
                        t.toLowerCase().includes(searchValue.toLowerCase()),
                      )
                      .map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(term)}
                          className="w-full text-left px-3 py-2 text-sm rounded transition-colors text-primary hover:bg-accent"
                        >
                          {term}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </form>

        {/* Date and Time */}
        <div className="items-center mx-4 hidden sm:flex">
          <DateTimeDisplay />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <button
              onClick={onPublish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              <span>PUBLISH</span>
            </button>
          )}

          <div className="flex items-center">
            <AccessibilitySettings />
          </div>

          <div className="hidden sm:flex items-center">
            <ThemeToggle />
          </div>

          {isAuthenticated && (
            <>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 rounded-lg transition-all hover:bg-accent"
                  title="Powiadomienia"
                  aria-label="Powiadomienia"
                >
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold bg-destructive text-destructive-foreground">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Welcome message and user menu */}
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">
                    Witaj, {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <div className="relative" ref={userMenuRef}>
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 cursor-pointer hover:scale-110 transition-transform border-primary">
                    <img
                      src={
                        user?.avatar ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Nexis"
                      }
                      alt={user?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border shadow-lg overflow-hidden z-50 bg-popover border-border">
                      <div className="p-3 border-b border-border">
                        <p className="font-semibold text-sm text-popover-foreground">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-accent text-popover-foreground"
                      >
                        <LogOut className="w-4 h-4" />
                        Wyloguj się
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalTab("login");
                  setShowAuthModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:opacity-80 bg-transparent border-border text-foreground"
              >
                <LogIn className="w-5 h-5" />
                <span>Zaloguj</span>
              </button>
              <button
                onClick={() => {
                  setAuthModalTab("register");
                  setShowAuthModal(true);
                }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all bg-gradient-to-r from-primary to-secondary text-primary-foreground"
              >
                <User className="w-5 h-5" />
                <span>Rejestracja</span>
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            initialTab={authModalTab}
          />
        )}
        {showNotifications && (
          <NotificationsPanel
            onClose={() => setShowNotifications(false)}
            onArticleClick={(articleId: any) => {
              // TODO: Navigate to article detail
              console.log("Navigate to article:", articleId);
            }}
          />
        )}
      </div>
    </header>
  );
}
