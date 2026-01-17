import { X } from "lucide-react";

import type { Screen } from "@/shared/types/article";

import { menuItems } from "@/shared/const/menuItems";
import { cn } from "@/shared/utils/cn";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
};

export function MobileSidebar({
  isOpen,
  onClose,
  currentScreen,
  onNavigate,
}: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 border-r z-50 transition-transform duration-300 overflow-y-auto",
          "bg-surface border-border",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-accent"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === (item.id as Screen);

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent",
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Communities Section */}
        <div className="p-4 pt-8 border-t border-border">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-muted-foreground">
            MY COMMUNITIES
          </h3>
          <div className="space-y-2">
            {["Quantum Physics", "Machine Learning", "Neuroscience"].map(
              (community, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm rounded-lg transition-all text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={onClose}
                >
                  <span className="text-primary">#</span> {community}
                </button>
              ),
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
