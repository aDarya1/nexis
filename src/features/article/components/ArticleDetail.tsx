import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  ExternalLink,
  Send,
  Download,
  Check,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { downloadArticleAsPDF } from "../../../utils/downloadArticle";

import type { Article } from "@/shared/types/article";
import type { Author } from "@/shared/types/author";

import {
  selectArticles,
  toggleLike,
  toggleSave,
  setDownloadState,
  addComment,
} from "@/features/article/articlesSlice";
import { selectFollow } from "@/features/follow/followSlice";
import { toggleFollow } from "@/features/follow/followSlice";
import { cn } from "@/shared/utils/cn";

type ArticleDetailProps = {
  article: Article;
  onBack: () => void;
  onDownload: (article: Article) => void;
};

export function ArticleDetail({
  article,
  onBack,
  onDownload,
}: ArticleDetailProps) {
  const dispatch = useDispatch();
  const followedAuthors = useSelector(selectFollow).followedAuthors;
  const articleState = useSelector(selectArticles)[article.id] || {
    liked: false,
    saved: false,
    likesCount: article.likes,
    downloadState: "default" as const,
    comments: [],
  };
  const { liked, saved, likesCount, downloadState, comments } = articleState;
  const [commentText, setCommentText] = useState(""); // Keep local for input

  // Utwórz обiekt автора з даних статті
  const mainAuthor: Author = {
    id: article.authors[0]
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    name: article.authors[0],
    field: article.tags[0]?.replace("#", "") || "Research",
    avatar: article.authorAvatar,
  };

  const authorIsFollowed = followedAuthors.includes(mainAuthor.id);

  const handlePostComment = () => {
    if (commentText.trim()) {
      dispatch(
        addComment({
          articleId: `${article.id}`,
          text: commentText,
          author: "You",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        }),
      );
      setCommentText("");
    }
  };

  const handleDownload = async () => {
    if (downloadState !== "default") return;
    dispatch(setDownloadState({ articleId: article.id, state: "downloading" }));
    try {
      await downloadArticleAsPDF(article);
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch(
        setDownloadState({ articleId: article.id, state: "downloaded" }),
      );
      onDownload(article);
    } catch (error) {
      dispatch(setDownloadState({ articleId: article.id, state: "default" }));
      alert(
        error instanceof Error
          ? error.message
          : "Nie udało się pobrać artykułu. Spróbuj ponownie.",
      );
    }
  };

  const handleToggleFollow = () => {
    dispatch(toggleFollow(mainAuthor.id));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary hover:text-primary mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to feed</span>
      </button>

      {/* Article Header */}
      <div className="bg-surface rounded-lg border border-border p-8 mb-6">
        {/* Preview Image */}
        {article.imageUrl && (
          <div className="mb-6 -mx-8 -mt-8 overflow-hidden rounded-t-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold text-text-primary mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={article.authorAvatar}
              alt={article.authors[0]}
              className="w-10 h-10 rounded-full border-2 border-primary/30"
            />
            <div>
              <p className="font-medium text-text-primary">
                {article.authors.join(", ")}
              </p>
              <p className="text-sm text-text-secondary">{article.time}</p>
            </div>
          </div>
          <button
            onClick={handleToggleFollow}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
              authorIsFollowed
                ? "bg-surface border border-border text-text-secondary hover:border-red-500 hover:text-red-500"
                : "bg-primary/20 border border-primary text-primary hover:bg-primary/30",
            )}
          >
            {authorIsFollowed ? (
              <>
                <UserMinus className="w-4 h-4" />
                <span className="text-sm font-medium">Przestań obserwować</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Obserwuj autora</span>
              </>
            )}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-surface border border-primary/30 text-primary text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Abstract */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-3">
            Abstract
          </h3>
          <p className="text-text-secondary leading-relaxed">
            {article.abstract}
          </p>
        </div>

        {/* DOI */}
        <a
          href={`https://doi.org/${article.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary font-medium group"
        >
          <span>DOI: {article.doi}</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleLike(article.id))}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                liked
                  ? "bg-pink-500/20 text-pink-500 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
                  : "text-text-secondary hover:bg-surface hover:text-pink-500",
              )}
            >
              <Heart className={cn("w-5 h-5", liked ? "fill-current" : "")} />
              <span className="font-medium">{likesCount}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleSave(article.id))}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                saved
                  ? "bg-save/20 text-save shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                  : "text-text-secondary hover:bg-surface hover:text-save",
              )}
            >
              <Bookmark
                className={cn("w-5 h-5", saved ? "fill-current" : "")}
              />
              <span className="font-medium">Save</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={downloadState === "downloading"}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                downloadState === "downloaded"
                  ? "bg-save/20 text-save shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                  : downloadState === "downloading"
                    ? "bg-primary/20 text-primary cursor-wait"
                    : "text-text-secondary hover:bg-surface hover:text-primary hover:shadow-[0_0_15px_rgba(0,238,255,0.2)]",
              )}
            >
              {downloadState === "downloading" ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="font-medium">DOWNLOADING...</span>
                </>
              ) : downloadState === "downloaded" ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="font-medium">DOWNLOADED</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span className="font-medium">DOWNLOAD</span>
                </>
              )}
            </button>

            <button className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:bg-surface hover:text-primary rounded-lg transition-all">
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-surface rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold text-text-primary mb-6">
          Discussion ({comments.length})
        </h3>

        {/* Add Comment */}
        <div className="mb-8">
          <div className="flex gap-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
              alt="You"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,238,255,0.2)] transition-all text-text-primary placeholder-text-secondary resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handlePostComment}
                  disabled={!commentText.trim()}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    commentText.trim()
                      ? "bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-[0_0_20px_rgba(0,238,255,0.4)]"
                      : "bg-muted text-muted-foreground cursor-not-allowed",
                  )}
                >
                  <Send className="w-4 h-4" />
                  <span>POST</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-bg rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">
                      {comment.author}
                    </h4>
                    <span className="text-xs text-text-secondary">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {comment.text}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 ml-4">
                  <button className="text-xs text-text-secondary hover:text-pink-500 transition-colors">
                    <Heart className="w-3 h-3 inline mr-1" />
                    {comment.likes}
                  </button>
                  <button className="text-xs text-text-secondary hover:text-primary transition-colors">
                    REPLY
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
