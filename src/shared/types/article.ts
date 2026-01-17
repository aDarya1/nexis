export type Article = {
  id: number | string;
  title: string;
  authors: string[];
  abstract: string;
  tags: string[];
  doi: string;
  likes: number;
  comments: number;
  saves: number;
  time: string;
  authorAvatar: string;
  imageUrl?: string;
  badge?: string;
  contentType?: string;
  featured?: boolean;
  layout?: string;
  isSaved?: boolean;
  isLiked?: boolean;
  isDownloaded?: boolean;
};

export type Screen =
  | "home"
  | "search"
  | "library"
  | "downloads"
  | "notifications"
  | "groups"
  | "calendar"
  | "collaborators"
  | "profile"
  | "weather"
  | "article-detail";
