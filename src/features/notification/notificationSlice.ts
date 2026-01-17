import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: string;
  timestamp: string;
  // ...другие поля
};

type NotificationState = {
  notifications: Notification[];
};

function getInitialNotifications(): NotificationState {
  const saved = localStorage.getItem("notifications");
  if (saved) {
    try {
      return { notifications: JSON.parse(saved) };
    } catch {
      /* empty */
    }
  }
  return { notifications: [] };
}

const initialState: NotificationState = getInitialNotifications();

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications),
      );
    },
    markAsRead(state, action: PayloadAction<string>) {
      const n = state.notifications.find((n) => n.id === action.payload);
      if (n) n.read = true;
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications),
      );
    },
    markAllAsRead(state) {
      state.notifications.forEach((n) => (n.read = true));
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications),
      );
    },
    clearAll(state) {
      state.notifications = [];
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications),
      );
    },
    deleteNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications),
      );
    },
    // ...другие редьюсеры
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  clearAll,
  deleteNotification,
} = notificationSlice.actions;
export const selectNotification = (state: {
  notification: NotificationState;
}) => state.notification;
export default notificationSlice.reducer;
