import type { Screen } from "@/shared/types/article";

import { menuItems } from "@/shared/const/menuItems";
import { cn } from "@/shared/utils/cn";

type SidebarProps = {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
};

export function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 border-r p-6 transition-colors duration-300",
        "bg-surface border-border",
      )}
    >
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
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
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-muted-foreground">
          MY COMMUNITIES
        </h3>
        <div className="space-y-2">
          {["Quantum Physics", "Machine Learning", "Neuroscience"].map(
            (community, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 text-sm rounded-lg transition-all text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <span className="text-primary">#</span> {community}
              </button>
            ),
          )}
        </div>
      </div>
    </aside>
  );
}
