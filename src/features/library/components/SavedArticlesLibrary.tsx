import { Bookmark, Search, Filter, Grid, List } from "lucide-react";
import { useState } from "react";

import type { Article } from "@/shared/types/article";

import { ArticleCard } from "@/features/article/components/ArticleCard";
import { cn } from "@/shared/utils/cn";

type SavedArticlesLibraryProps = {
  onArticleClick: (article: Article) => void;
  onDownload: (article: Article) => void;
};

export function SavedArticlesLibrary({
  onArticleClick,
  onDownload,
}: SavedArticlesLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Pobierz zapisane artykuły z localStorage (placeholder dla backendu)
  const [savedArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("savedArticles");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Przykładowe zapisane artykuły
    return [
      {
        id: 1,
        title:
          "Neural Networks for Protein Folding Prediction: AlphaFold3 and Beyond",
        authors: ["Dr. Elena Rodriguez", "Prof. Marcus Chen"],
        abstract:
          "Recent discoveries suggest that quantum entanglement may play a crucial role in biological processes...",
        tags: ["#AI", "#Bioinformatics", "#ProteinFolding"],
        doi: "10.48550/arXiv.2024.12345",
        likes: 1247,
        comments: 234,
        saves: 892,
        time: "1 hour ago",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        isSaved: true,
      },
      {
        id: 2,
        title:
          "Quantum Computing Breakthrough: 1000-Qubit Processor Achieves Quantum Supremacy",
        authors: ["Prof. James Chen", "Dr. Sofia Martinez"],
        abstract: "We present a groundbreaking 1000-qubit quantum processor...",
        tags: ["#QuantumComputing", "#Physics"],
        doi: "10.1038/s41586-2024-08456",
        likes: 2341,
        comments: 567,
        saves: 1543,
        time: "2 hours ago",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        isSaved: true,
      },
    ];
  });

  const allTags = Array.from(new Set(savedArticles.flatMap((a) => a.tags)));

  const filteredArticles = savedArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => article.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-save/20">
              <Bookmark className="w-6 h-6 text-save" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                Zapisane artykuły
              </h1>
              <p className="text-sm text-text-secondary">
                {savedArticles.length} zapisanych artykułów
              </p>
            </div>
          </div>

          {/* Search and View Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj w zapisanych artykułach..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-bg border-border text-text-primary"
              />
            </div>

            <div className="flex items-center gap-1 rounded-lg border p-1 border-border">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded transition-all",
                  viewMode === "list" ? "bg-primary/20" : "transparent",
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded transition-all",
                  viewMode === "grid" ? "bg-primary/20" : "transparent",
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">
                Filtruj po tagach:
              </span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: selectedTags.includes(tag)
                      ? "bg-primary/20"
                      : "var(--surface)",
                    borderColor: selectedTags.includes(tag)
                      ? "border-primary"
                      : "var(--border)",
                    color: selectedTags.includes(tag)
                      ? "text-primary"
                      : "text-text-secondary",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Articles */}
        {filteredArticles.length > 0 ? (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-2 gap-6" : "space-y-6"
            }
          >
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onArticleClick={onArticleClick}
                onDownload={onDownload}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
            <p className="text-lg font-medium mb-2 text-text-primary">
              {searchQuery || selectedTags.length > 0
                ? "Nie znaleziono artykułów"
                : "Brak zapisanych artykułów"}
            </p>
            <p className="text-sm text-text-secondary">
              {searchQuery || selectedTags.length > 0
                ? "Spróbuj zmienić kryteria wyszukiwania"
                : "Zapisz artykuły, aby mieć do nich szybki dostęp"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
