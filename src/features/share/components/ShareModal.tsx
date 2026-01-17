import {
  X,
  Copy,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  Check,
} from "lucide-react";
import { useState } from "react";

import type { Article } from "@/shared/types/article";

type ShareModalProps = {
  article: Article;
  onClose: () => void;
};

export function ShareModal({ article, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const articleUrl = `${window.location.origin}/article/${article.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: "Email",
      icon: Mail,
      color: "#3B82F6",
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(articleUrl)}`;
      },
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`,
          "_blank",
        );
      },
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
          "_blank",
        );
      },
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "#0077B5",
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
          "_blank",
        );
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Udostępnij artykuł
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--hover)]"
            style={{ color: "var(--text-secondary)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3
              className="font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {article.title}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {article.authors.join(", ")}
            </p>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Link do artykułu
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={articleUrl}
                readOnly
                className="flex-1 px-4 py-2 rounded-lg border text-sm"
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-lg transition-all bg-save text-white"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 inline mr-1" />
                    Skopiowano
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 inline mr-1" />
                    Kopiuj
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Udostępnij przez
            </label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: option.color }} />
                    <span className="font-medium">{option.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
