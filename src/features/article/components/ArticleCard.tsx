import {
  Bookmark,
  Download,
  Share,
  MoreHorizontal,
  Clock,
  MessageCircle,
} from "lucide-react";

import type { Article } from "@/shared/types/article";

import { cn } from "@/shared/utils/cn";

type ArticleCardProps = {
  article: Article;
  onArticleClick: (article: Article) => void;
  onDownload: (article: Article) => void;
};

export function ArticleCard({
  article,
  onArticleClick,
  onDownload,
}: ArticleCardProps) {
  const badgeClasses =
    article.badge === "NEW"
      ? "bg-cyan-500/20 text-cyan-500"
      : article.badge === "TRENDING"
        ? "bg-pink-500/20 text-pink-500"
        : article.badge === "OPEN ACCESS"
          ? "bg-green-500/20 text-green-500"
          : "";

  return (
    <div
      onClick={() => onArticleClick(article)}
      className={cn(
        "group relative rounded-lg border border-border overflow-hidden cursor-pointer transition-transform transform hover:scale-[1.02] bg-card",
      )}
    >
      {/* Badge */}
      {article.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className={cn(
              "text-xs font-bold rounded-full px-2 py-1",
              badgeClasses,
            )}
          >
            {article.badge}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="h-40 md:h-48 lg:h-56">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-card-foreground mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Authors and Meta Info */}
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <img
              src={article.authorAvatar}
              alt={article.authors.join(", ")}
              className="w-5 h-5 rounded-full"
            />
            {article.authors.join(", ")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.time}
          </span>
          <span className="flex items-center gap-1">
            <Bookmark className="w-4 h-4" />
            {article.likes} likes
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {article.comments} comments
          </span>
        </div>

        {/* Abstract */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {article.abstract}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(article);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:bg-primary/80"
        >
          <Download className="w-4 h-4" />
          Pobierz
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg transition-all hover:bg-primary/10">
            <Share className="w-4 h-4 text-primary" />
          </button>
          <button className="p-2 rounded-lg transition-all hover:bg-primary/10">
            <MoreHorizontal className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}
