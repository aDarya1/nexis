import { Bell, X, Check, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAll,
} from "../notificationSlice";

import { cn } from "@/shared/utils/cn";

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: string;
  timestamp: string;
  articleId?: string;
  authorName?: string;
  authorAvatar?: string;
};

type NotificationsPanelProps = {
  onClose: () => void;
  onArticleClick?: (articleId: string) => void;
};

export function NotificationsPanel({
  onClose,
  onArticleClick,
}: NotificationsPanelProps) {
  const dispatch = useDispatch();
  const { notifications } = useSelector(selectNotification);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new_publication":
        return "📄";
      case "comment":
        return "💬";
      case "like":
        return "❤️";
      case "follow":
        return "👤";
      case "mention":
        return "🔔";
      case "event":
        return "📅";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "new_publication":
        return "text-primary";
      case "comment":
        return "text-blue-500";
      case "like":
        return "text-red-500";
      case "follow":
        return "text-secondary";
      case "mention":
        return "text-amber-500";
      case "event":
        return "text-green-500";
      default:
        return "text-primary";
    }
  };

  const getNotificationBgColor = (type: Notification["type"]) => {
    switch (type) {
      case "new_publication":
        return "bg-primary/20";
      case "comment":
        return "bg-blue-500/20";
      case "like":
        return "bg-red-500/20";
      case "follow":
        return "bg-secondary/20";
      case "mention":
        return "bg-amber-500/20";
      case "event":
        return "bg-green-500/20";
      default:
        return "bg-primary/20";
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }

    if (notification.articleId && onArticleClick) {
      onArticleClick(notification.articleId);
      onClose();
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl max-h-[80vh] rounded-xl border shadow-2xl flex flex-col bg-surface border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Powiadomienia
            </h2>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={() => dispatch(markAllAsRead())}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-accent text-muted-foreground"
                title="Oznacz wszystkie jako przeczytane"
              >
                <Check className="w-4 h-4" />
                <span>Przeczytaj wszystkie</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-accent"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="w-16 h-16 mb-4 text-muted-foreground" />
              <p className="text-lg text-foreground font-medium mb-2">
                Brak powiadomień
              </p>
              <p className="text-sm text-muted-foreground">
                Będziesz otrzymywać powiadomienia o nowych publikacjach,
                komentarzach i innych aktywnościach
              </p>
            </div>
          ) : (
            notifications.map((notification: Notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg border transition-all cursor-pointer bg-card border-border",
                  !notification.read && "border-l-4 border-l-primary",
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0",
                      getNotificationBgColor(notification.type),
                    )}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={cn(
                          "text-sm font-semibold text-foreground",
                          !notification.read && "font-bold",
                        )}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full flex-shrink-0 mt-1",
                            getNotificationColor(notification.type),
                          )}
                        />
                      )}
                    </div>
                    <p className="text-sm mb-2 text-muted-foreground">
                      {notification.message}
                    </p>
                    {notification.authorName && (
                      <div className="flex items-center gap-2 mb-2">
                        {notification.authorAvatar && (
                          <img
                            src={notification.authorAvatar}
                            alt={notification.authorName}
                            className="w-5 h-5 rounded-full"
                          />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {notification.authorName}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteNotification(notification.id));
                        }}
                        className="p-1 rounded transition-colors hover:bg-accent text-muted-foreground"
                        title="Usuń powiadomienie"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-border">
            <button
              onClick={() => dispatch(clearAll())}
              className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent text-muted-foreground"
            >
              Wyczyść wszystkie
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
