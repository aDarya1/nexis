import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type ArticleInteraction = {
  liked: boolean;
  saved: boolean;
  likesCount: number;
  downloadState: "default" | "downloading" | "downloaded";
  showCopied: boolean;
  comments: {
    id: number | string;
    author: string;
    avatar: string;
    text: string;
    time: string;
    likes: number;
  }[];
};

type ArticlesState = Record<string, ArticleInteraction>;

const initialState: ArticlesState = {};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string | number>) {
      const id = action.payload;
      if (!state[id])
        state[id] = {
          liked: false,
          saved: false,
          likesCount: 0,
          downloadState: "default",
          showCopied: false,
          comments: [],
        };
      state[id].liked = !state[id].liked;
      state[id].likesCount += state[id].liked ? 1 : -1;
    },
    toggleSave(state, action: PayloadAction<string | number>) {
      const id = action.payload;
      if (!state[id])
        state[id] = {
          liked: false,
          saved: false,
          likesCount: 0,
          downloadState: "default",
          showCopied: false,
          comments: [],
        };
      state[id].saved = !state[id].saved;
    },
    setDownloadState(
      state,
      action: PayloadAction<{
        articleId: string | number;
        state: "default" | "downloading" | "downloaded";
      }>,
    ) {
      const { articleId, state: downloadState } = action.payload;
      if (!state[articleId])
        state[articleId] = {
          liked: false,
          saved: false,
          likesCount: 0,
          downloadState: "default",
          showCopied: false,
          comments: [],
        };
      state[articleId].downloadState = downloadState;
    },
    shareArticle(state, action: PayloadAction<string | number>) {
      const id = action.payload;
      if (!state[id])
        state[id] = {
          liked: false,
          saved: false,
          likesCount: 0,
          downloadState: "default",
          showCopied: false,
          comments: [],
        };
      state[id].showCopied = true;
      setTimeout(() => {
        state[id].showCopied = false;
      }, 2000);
    },
    addComment(
      state,
      action: PayloadAction<{
        articleId: string | number;
        text: string;
        author: string;
        avatar: string;
      }>,
    ) {
      const { articleId, text, author, avatar } = action.payload;
      if (!state[articleId])
        state[articleId] = {
          liked: false,
          saved: false,
          likesCount: 0,
          downloadState: "default",
          showCopied: false,
          comments: [],
        };
      state[articleId].comments.push({
        id: Date.now(),
        author,
        avatar,
        text,
        time: "Just now",
        likes: 0,
      });
    },
  },
});

export const {
  toggleLike,
  toggleSave,
  setDownloadState,
  shareArticle,
  addComment,
} = articlesSlice.actions;
export const selectArticles = (state: { articles: ArticlesState }) =>
  state.articles;
export default articlesSlice.reducer;
