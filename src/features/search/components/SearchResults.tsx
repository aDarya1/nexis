import {
  Filter,
  Grid,
  List,
  Download,
  BookmarkPlus,
  ChevronDown,
  ChevronUp,
  Save,
  TrendingUp,
  Check,
  Clock,
  Loader2,
  AlertCircle,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";

import type { SearchFilters } from "@/shared/mock/SearchDatabase";
import type { Article } from "@/shared/types/article";

import { ArticleCard } from "@/features/article/components/ArticleCard";
import { searchArticles } from "@/shared/mock/SearchDatabase";
import { cn } from "@/shared/utils/cn";

type SearchResultsProps = {
  searchQuery: string;
  onArticleClick: (article: Article) => void;
  onDownload: (article: Article) => void;
};

export function SearchResults({
  searchQuery,
  onArticleClick,
  onDownload,
}: SearchResultsProps) {
  const [peerReviewed, setPeerReviewed] = useState(false);
  const [lastYear, setLastYear] = useState(false);
  const [openAccess, setOpenAccess] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const [citationMin, setCitationMin] = useState(0);
  const [dateRange, setDateRange] = useState({ start: 2020, end: 2024 });
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [publicationType, setPublicationType] = useState<string[]>([]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [searchSaved, setSearchSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "citations">(
    "relevance",
  );
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchBy, setSearchBy] = useState<"all" | "title" | "author">("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "quantum computing",
    "artificial intelligence",
    "climate change",
    "CRISPR gene editing",
  ]);

  const scientificFields = [
    {
      id: "cs",
      name: "Computer Science",
      children: [
        { id: "ai", name: "Artificial Intelligence" },
        { id: "theory", name: "Theory" },
      ],
    },
    {
      id: "bio",
      name: "Biology",
      children: [
        { id: "genetics", name: "Genetics" },
        { id: "neuro", name: "Neuroscience" },
      ],
    },
    {
      id: "physics",
      name: "Physics",
      children: [
        { id: "quantum", name: "Quantum Physics" },
        { id: "astro", name: "Astrophysics" },
      ],
    },
  ];

  const publicationTypes = [
    "Preprint",
    "Peer-reviewed",
    "Conference Paper",
    "Dataset",
    "Code",
  ];

  const trendingSearches = ["quantum", "AI", "climate", "CRISPR"];

  // Wykonaj wyszukiwanie gdy zapytanie lub filtry się zmienią
  useEffect(() => {
    performSearch();
  }, [
    searchQuery,
    peerReviewed,
    openAccess,
    publicationType,
    sortBy,
    searchBy,
    citationMin,
    dateRange,
  ]);

  const performSearch = async () => {
    setIsLoading(true);
    setSearchError(null);

    try {
      // Symulacja opóźnienia sieciowego (krótsze dla lepszego UX)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Zastąp tym prawdziwym wywołaniem API gdy backend będzie gotowy
      // const response = await fetch(`/api/articles/search?q=${encodeURIComponent(searchQuery)}&searchBy=${searchBy}...`);
      // const results = await response.json();

      const filters: SearchFilters = {
        peerReviewed,
        openAccess,
        dateRange,
        citationMin,
        publicationType,
        searchBy,
      };

      const results = searchArticles(searchQuery, filters);

      // Sortowanie wyników
      const sortedResults = [...results];
      if (sortBy === "date") {
        sortedResults.sort((a, b) => {
          const timeValues: { [key: string]: number } = {
            "just now": 0,
            "1 hour ago": 1,
            "2 hours ago": 2,
            "3 hours ago": 3,
            "5 hours ago": 5,
            "8 hours ago": 8,
            "12 hours ago": 12,
            "1 day ago": 24,
            "2 days ago": 48,
            "3 days ago": 72,
            "4 days ago": 96,
            "5 days ago": 120,
            "6 days ago": 144,
            "1 week ago": 168,
            "2 weeks ago": 336,
          };
          return (
            (timeValues[a.time.toLowerCase()] || 999) -
            (timeValues[b.time.toLowerCase()] || 999)
          );
        });
      } else if (sortBy === "citations") {
        sortedResults.sort((a, b) => b.likes - a.likes);
      } else {
        // Sortowanie po trafności (domyślne) - sortuj po tym, ile razy zapytanie występuje w tekście
        if (searchQuery && searchQuery.trim()) {
          const queryLower = searchQuery.toLowerCase().trim();
          // Escapuj specjalne znaki regex
          const escapedQuery = queryLower.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&",
          );
          sortedResults.sort((a, b) => {
            const aMatches =
              (a.title.toLowerCase().match(new RegExp(escapedQuery, "g")) || [])
                .length +
              (
                a.abstract.toLowerCase().match(new RegExp(escapedQuery, "g")) ||
                []
              ).length;
            const bMatches =
              (b.title.toLowerCase().match(new RegExp(escapedQuery, "g")) || [])
                .length +
              (
                b.abstract.toLowerCase().match(new RegExp(escapedQuery, "g")) ||
                []
              ).length;
            return bMatches - aMatches;
          });
        }
      }

      setArticles(sortedResults);

      // Dodaj do ostatnich wyszukiwań jeśli nie jest puste i ma wyniki
      if (
        searchQuery &&
        !recentSearches.includes(searchQuery) &&
        sortedResults.length > 0
      ) {
        setRecentSearches([searchQuery, ...recentSearches.slice(0, 3)]);
      }
    } catch (error) {
      console.error("Błąd wyszukiwania:", error);
      setSearchError("Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyFilters = () => {
    setFiltersApplied(true);
  };

  const toggleArticleSelection = (id: number) => {
    setSelectedArticles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleExport = (format: string) => {
    setShowExportMenu(false);
    alert(
      `Exporting ${selectedArticles.length || articles.length} articles as ${format}`,
    );
  };

  const handleSaveSearch = () => {
    setSearchSaved(true);
    setTimeout(() => setSearchSaved(false), 3000);
  };

  const toggleField = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((f) => f !== fieldId)
        : [...prev, fieldId],
    );
  };

  const togglePublicationType = (type: string) => {
    setPublicationType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const filteredCount = filtersApplied
    ? Math.floor(articles.length * 0.6)
    : articles.length;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats and Actions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Search Results
                {searchQuery && (
                  <span className="text-primary"> for "{searchQuery}"</span>
                )}
              </h1>
              <p className="text-secondary">
                Found{" "}
                <span className="text-primary font-semibold">
                  {articles.length}
                </span>{" "}
                publications
                {filtersApplied && (
                  <span className="text-save">
                    {" "}
                    • {filteredCount} match all filters
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Save Search */}
              <button
                onClick={handleSaveSearch}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all border"
                style={{
                  backgroundColor: searchSaved
                    ? `rgba(0, 238, 255, 0.2)`
                    : "var(--surface)",
                  borderColor: searchSaved ? "rgb(0 238 255)" : "var(--border)",
                  color: searchSaved ? "rgb(0 238 255)" : "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  if (!searchSaved) {
                    e.currentTarget.style.borderColor = "var(--primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!searchSaved) {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }
                }}
              >
                {searchSaved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {searchSaved ? "SAVED" : "SAVE SEARCH"}
                </span>
              </button>

              {/* Export Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">EXPORT</span>
                </button>
                {showExportMenu && (
                  <div
                    className={cn(
                      "absolute top-full mt-2 w-full rounded-xl shadow-2xl z-50 overflow-hidden border transition-colors",
                      "bg-popover border-border",
                    )}
                  >
                    {["CSV", "BibTeX", "RIS"].map((format) => (
                      <button
                        key={format}
                        onClick={() => handleExport(format)}
                        className="w-full px-4 py-2 text-left text-sm transition-colors text-popover-foreground hover:bg-accent"
                        style={{
                          color: "var(--text-primary)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(0,238,255,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        Export as {format}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View Mode Toggle */}
              <div
                className="flex items-center gap-1 rounded-lg border p-1"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <button
                  onClick={() => setViewMode("list")}
                  className="p-2 rounded transition-all"
                  style={{
                    backgroundColor:
                      viewMode === "list"
                        ? `rgba(0, 238, 255, 0.2)`
                        : "transparent",
                    color:
                      viewMode === "list"
                        ? "rgb(0 238 255)"
                        : "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (viewMode !== "list") {
                      e.currentTarget.style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (viewMode !== "list") {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className="p-2 rounded transition-all"
                  style={{
                    backgroundColor:
                      viewMode === "grid"
                        ? `rgba(0, 238, 255, 0.2)`
                        : "transparent",
                    color:
                      viewMode === "grid"
                        ? "rgb(0 238 255)"
                        : "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (viewMode !== "grid") {
                      e.currentTarget.style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (viewMode !== "grid") {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                  title="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Trending Searches */}
          <div className="flex items-center gap-3 text-sm flex-wrap">
            <TrendingUp
              className="w-4 h-4"
              style={{ color: "var(--secondary)" }}
            />
            <span className="text-secondary">Popular searches:</span>
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  const event = new CustomEvent("performSearch", {
                    detail: search,
                  });
                  window.dispatchEvent(event);
                }}
                className="px-3 py-1 rounded-full border transition-all text-xs"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--secondary)";
                  e.currentTarget.style.color = "var(--secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
              >
                {search}
              </button>
            ))}
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && searchQuery && (
            <div className="flex items-center gap-3 text-sm flex-wrap mt-2">
              <Clock
                className="w-4 h-4"
                style={{ color: "var(--text-secondary)" }}
              />
              <span className="text-secondary">Recent:</span>
              {recentSearches
                .filter((s) => s !== searchQuery)
                .slice(0, 3)
                .map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const event = new CustomEvent("performSearch", {
                        detail: search,
                      });
                      window.dispatchEvent(event);
                    }}
                    className="px-3 py-1 rounded-full border transition-all text-xs"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.color = "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {search}
                  </button>
                ))}
            </div>
          )}

          {/* Search Type Filter */}
          <div className="flex items-center gap-3 text-sm flex-wrap mt-3">
            <span className="text-secondary">Szukaj w:</span>
            <div className="flex gap-2">
              {(["all", "title", "author"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSearchBy(type)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all border"
                  style={{
                    backgroundColor:
                      searchBy === type
                        ? `rgba(0, 238, 255, 0.2)`
                        : "var(--bg)",
                    borderColor:
                      searchBy === type ? "rgb(0 238 255)" : "var(--border)",
                    color:
                      searchBy === type
                        ? "rgb(0 238 255)"
                        : "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (searchBy !== type) {
                      e.currentTarget.style.borderColor = "var(--border)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (searchBy !== type) {
                      e.currentTarget.style.borderColor = "var(--border)";
                    }
                  }}
                >
                  {type === "all"
                    ? "Wszystko"
                    : type === "title"
                      ? "Tytuł"
                      : "Autor"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Advanced Filters Sidebar */}
          <aside>
            <div
              className={cn(
                "rounded-lg border sticky top-24",
                "bg-card border-border",
              )}
            >
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="w-full flex items-center justify-between p-4 border-b transition-colors border-border hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Advanced Filters
                  </h3>
                </div>
                {showAdvancedFilters ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {showAdvancedFilters && (
                <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Quick Filters */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      QUICK FILTERS
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={peerReviewed}
                          onChange={(e) => setPeerReviewed(e.target.checked)}
                          className="w-5 h-5 border-2 rounded"
                          style={{
                            backgroundColor: "var(--bg)",
                            borderColor: "var(--border)",
                          }}
                        />
                        <span className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                          Peer-reviewed only
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={openAccess}
                          onChange={(e) => setOpenAccess(e.target.checked)}
                          className="w-5 h-5 border-2 rounded"
                          style={{
                            backgroundColor: "var(--bg)",
                            borderColor: "var(--border)",
                          }}
                        />
                        <span className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                          Open Access
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={lastYear}
                          onChange={(e) => setLastYear(e.target.checked)}
                          className="w-5 h-5 border-2 rounded"
                          style={{
                            backgroundColor: "var(--bg)",
                            borderColor: "var(--border)",
                          }}
                        />
                        <span className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                          Last year
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Publication Type */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      PUBLICATION TYPE
                    </h4>
                    <div className="space-y-2">
                      {publicationTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={publicationType.includes(type)}
                            onChange={() => togglePublicationType(type)}
                            className="w-4 h-4 border-2 rounded"
                            style={{
                              backgroundColor: "var(--bg)",
                              borderColor: "var(--border)",
                            }}
                          />
                          <span className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Scientific Fields */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      SCIENTIFIC FIELD
                    </h4>
                    <div className="space-y-2">
                      {scientificFields.map((field) => (
                        <div key={field.id}>
                          <label className="flex items-center gap-2 cursor-pointer group mb-1">
                            <input
                              type="checkbox"
                              checked={selectedFields.includes(field.id)}
                              onChange={() => toggleField(field.id)}
                              className="w-4 h-4 border-2 rounded"
                              style={{
                                backgroundColor: "var(--bg)",
                                borderColor: "var(--border)",
                              }}
                            />
                            <span className="text-sm font-medium transition-colors text-foreground">
                              {field.name}
                            </span>
                          </label>
                          {field.children && (
                            <div className="ml-6 space-y-1">
                              {field.children.map((child) => (
                                <label
                                  key={child.id}
                                  className="flex items-center gap-2 cursor-pointer group"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedFields.includes(child.id)}
                                    onChange={() => toggleField(child.id)}
                                    className="w-3 h-3 border rounded"
                                    style={{
                                      backgroundColor: "var(--bg)",
                                      borderColor: "var(--border)",
                                    }}
                                  />
                                  <span className="text-xs transition-colors text-muted-foreground hover:text-foreground">
                                    {child.name}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Range */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      PUBLICATION DATE
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={dateRange.start}
                          onChange={(e) =>
                            setDateRange({
                              ...dateRange,
                              start: parseInt(e.target.value),
                            })
                          }
                          className="w-20 px-2 py-1 border rounded text-sm bg-background border-border text-foreground focus:ring-2 focus:ring-ring"
                          min="2000"
                          max="2024"
                        />
                        <span className="text-muted-foreground">to</span>
                        <input
                          type="number"
                          value={dateRange.end}
                          onChange={(e) =>
                            setDateRange({
                              ...dateRange,
                              end: parseInt(e.target.value),
                            })
                          }
                          className="w-20 px-2 py-1 border rounded text-sm bg-background border-border text-foreground focus:ring-2 focus:ring-ring"
                          min="2000"
                          max="2024"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Last week", "Last month", "Last year"].map(
                          (period) => (
                            <button
                              key={period}
                              className="px-2 py-1 text-xs border rounded transition-all bg-background border-border text-muted-foreground hover:border-primary hover:text-primary"
                            >
                              {period}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Citations */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      MIN. CITATIONS
                    </h4>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={citationMin}
                      onChange={(e) => setCitationMin(parseInt(e.target.value))}
                      className="w-full"
                      style={{
                        accentColor: "var(--primary)",
                      }}
                    />
                    <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                      <span>0</span>
                      <span className="text-primary font-semibold">
                        {citationMin}
                      </span>
                      <span>1000+</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={handleApplyFilters}
                    className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    APPLY FILTERS
                  </button>

                  {filtersApplied && (
                    <div className="text-center text-sm text-green-600">
                      ✓ Filters applied
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Results */}
          <main>
            {/* Sort Options */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <div className="flex gap-2">
                  {(["relevance", "date", "citations"] as const).map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          performSearch();
                        }}
                        className="px-3 py-1.5 text-sm rounded-lg transition-all border bg-card border-border text-muted-foreground hover:text-foreground"
                        style={{
                          backgroundColor:
                            sortBy === option
                              ? `rgba(0, 238, 255, 0.2)`
                              : "var(--surface)",
                          borderColor:
                            sortBy === option
                              ? "rgb(0 238 255)"
                              : "var(--border)",
                          color:
                            sortBy === option
                              ? "rgb(0 238 255)"
                              : "var(--text-secondary)",
                        }}
                        onMouseEnter={(e) => {
                          if (sortBy !== option) {
                            e.currentTarget.style.color = "var(--text-primary)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (sortBy !== option) {
                            e.currentTarget.style.color =
                              "var(--text-secondary)";
                          }
                        }}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {!isLoading && articles.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Showing {articles.length} result
                  {articles.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* Error State */}
            {searchError && !isLoading && (
              <div className="flex flex-col items-center justify-center py-20 bg-card rounded-lg border border-destructive/30">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg text-foreground font-medium mb-2">
                  Błąd wyszukiwania
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchError}
                </p>
                <button
                  onClick={performSearch}
                  className="px-4 py-2 bg-primary text-primary-foreground border border-primary rounded-lg hover:bg-primary/90 transition-all"
                >
                  Spróbuj ponownie
                </button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 bg-card rounded-lg border border-border">
                <Loader2 className="w-12 h-12 text-[#00eeff] animate-spin mb-4" />
                <p className="text-lg text-foreground font-medium">
                  Wyszukiwanie...
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Analizowanie{" "}
                  {searchQuery ? `"${searchQuery}"` : "bazy danych"}...
                </p>
              </div>
            )}

            {selectedArticles.length > 0 && (
              <div className="mb-4 p-4 bg-card border border-primary/30 rounded-lg flex items-center justify-between">
                <span className="text-sm text-foreground">
                  <span className="text-primary font-semibold">
                    {selectedArticles.length}
                  </span>{" "}
                  article{selectedArticles.length !== 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded hover:bg-secondary/90 transition-all">
                    <BookmarkPlus className="w-4 h-4 inline mr-1" />
                    Add to Collection
                  </button>
                  <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-all">
                    <Download className="w-4 h-4 inline mr-1" />
                    Download ZIP
                  </button>
                </div>
              </div>
            )}

            {/* Results Display */}
            {!isLoading && articles.length > 0 && (
              <div
                className={
                  viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-6"
                }
              >
                {articles.map((article) => (
                  <div key={article.id} className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(+article.id)}
                        onChange={() => toggleArticleSelection(+article.id)}
                        className="w-5 h-5 bg-[#121212] border-2 border-gray-700 rounded checked:bg-[#00eeff] checked:border-[#00eeff] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <ArticleCard
                      article={article}
                      onArticleClick={onArticleClick}
                      onDownload={onDownload}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && !searchError && articles.length === 0 && (
              <div className="text-center py-16 bg-card rounded-lg border border-border">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nie znaleziono wyników{searchQuery && ` dla "${searchQuery}"`}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? (
                    <>
                      Spróbuj zmienić zapytanie lub użyj innych filtrów.
                      <br />
                      Możesz również wypróbować popularne wyszukiwania:
                    </>
                  ) : (
                    "Wprowadź zapytanie wyszukiwania lub wypróbuj popularne wyszukiwania:"
                  )}
                </p>
                <div className="flex justify-center gap-2 mt-6 flex-wrap">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        const event = new CustomEvent("performSearch", {
                          detail: term,
                        });
                        window.dispatchEvent(event);
                      }}
                      className="px-4 py-2 bg-primary text-primary-foreground border border-primary rounded-lg hover:bg-primary/90 transition-all text-sm"
                    >
                      Szukaj "{term}"
                    </button>
                  ))}
                </div>
                {(filtersApplied || searchBy !== "all") && (
                  <button
                    onClick={() => {
                      setFiltersApplied(false);
                      setSearchBy("all");
                      setPeerReviewed(false);
                      setOpenAccess(false);
                      setPublicationType([]);
                      setCitationMin(0);
                      performSearch();
                    }}
                    className="mt-4 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Wyczyść wszystkie filtry
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
