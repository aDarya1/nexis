import { Download } from "lucide-react";

import type { Article } from "@/shared/types/article";

import { ArticleCard } from "@/features/article/components/ArticleCard";

type LibraryDownloadsProps = {
  downloadedArticles: Article[];
  onArticleClick: (article: Article) => void;
};

export function LibraryDownloads({
  downloadedArticles,
  onArticleClick,
}: LibraryDownloadsProps) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/20 rounded-lg">
          <Download className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Downloads</h1>
          <p className="text-muted-foreground">
            {downloadedArticles.length} article
            {downloadedArticles.length !== 1 ? "s" : ""} downloaded locally
          </p>
        </div>
      </div>

      {downloadedArticles.length > 0 ? (
        <div className="space-y-6">
          {downloadedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onArticleClick={onArticleClick}
              onDownload={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <div className="inline-flex p-4 bg-muted rounded-full mb-4">
            <Download className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            No downloads yet
          </h3>
          <p className="text-muted-foreground">
            Articles you download will appear here for offline access
          </p>
        </div>
      )}
    </div>
  );
}
