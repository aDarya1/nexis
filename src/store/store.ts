import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import accessibilityReducer from "../features/accessibility/accessibilitySlice";
import appReducer from "../features/app/appSlice";
import articlesReducer from "../features/article/articlesSlice";
import authReducer from "../features/auth/authSlice";
import followReducer from "../features/follow/followSlice";
import themeReducer from "../features/header/components/themeSlice";
import notificationReducer from "../features/notification/notificationSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    accessibility: accessibilityReducer,
    app: appReducer,
    articles: articlesReducer,
    auth: authReducer,
    follow: followReducer,
    notification: notificationReducer,
    profile: profileReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectAuth = (state: RootState) => state.auth;
export const useAppDispatch = () => useDispatch<AppDispatch>();
