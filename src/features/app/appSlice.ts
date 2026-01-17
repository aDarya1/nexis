import { createSlice } from "@reduxjs/toolkit";

import type { Article, Screen } from "@/shared/types/article";
import type { PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  currentScreen: Screen;
  showPublishModal: boolean;
  selectedArticle: Article | null;
  newArticles: Article[];
  searchQuery: string;
  downloadedArticles: Article[];
  toastMessage: string;
  showToast: boolean;
};

const initialState: AppState = {
  currentScreen: "home",
  showPublishModal: false,
  selectedArticle: null,
  newArticles: [],
  searchQuery: "",
  downloadedArticles: [],
  toastMessage: "",
  showToast: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setScreen(state, action: PayloadAction<Screen>) {
      state.currentScreen = action.payload;
    },
    setPublishModal(state, action: PayloadAction<boolean>) {
      state.showPublishModal = action.payload;
    },
    setSelectedArticle(state, action: PayloadAction<Article | null>) {
      state.selectedArticle = action.payload;
    },
    addNewArticle(state, action: PayloadAction<Article>) {
      state.newArticles.unshift(action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addDownloadedArticle(state, action: PayloadAction<Article>) {
      if (!state.downloadedArticles.find((a) => a.id === action.payload.id)) {
        state.downloadedArticles.unshift(action.payload);
      }
    },
    showToast(state, action: PayloadAction<string>) {
      state.toastMessage = action.payload;
      state.showToast = true;
    },
    hideToast(state) {
      state.showToast = false;
    },
  },
});

export const {
  setScreen,
  setPublishModal,
  setSelectedArticle,
  addNewArticle,
  setSearchQuery,
  addDownloadedArticle,
  showToast,
  hideToast,
} = appSlice.actions;

export const selectApp = (state: { app: AppState }) => state.app;
export default appSlice.reducer;
