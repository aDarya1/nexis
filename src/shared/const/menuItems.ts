import {
  Home,
  BookMarked,
  Bell,
  User,
  Download,
  Users,
  Calendar,
  UserSearch,
  Cloud,
  type LucideProps,
} from "lucide-react";

import type { Screen } from "../types/article";

export const menuItems: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  id: Screen;
}[] = [
  { icon: Home, label: "Home", id: "home" },
  { icon: BookMarked, label: "Library", id: "library" },
  { icon: Download, label: "Downloads", id: "downloads" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: Users, label: "Groups", id: "groups" },
  { icon: Calendar, label: "Calendar", id: "calendar" },
  { icon: UserSearch, label: "Collaborators", id: "collaborators" },
  { icon: Cloud, label: "Weather", id: "weather" },
  { icon: User, label: "Profile", id: "profile" },
];
