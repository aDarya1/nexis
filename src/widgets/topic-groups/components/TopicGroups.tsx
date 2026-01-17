import { Users, TrendingUp, Plus, Search } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/utils/cn";

type TopicGroup = {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  category: string;
  isJoined: boolean;
  trending: boolean;
};

export function TopicGroups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "AI",
    "Physics",
    "Biology",
    "Chemistry",
    "Medicine",
    "Engineering",
  ];

  const [groups, setGroups] = useState<TopicGroup[]>([
    {
      id: "1",
      name: "Quantum Computing Research",
      description:
        "Discussing latest breakthroughs in quantum computing and quantum algorithms",
      members: 1247,
      posts: 342,
      category: "Physics",
      isJoined: true,
      trending: true,
    },
    {
      id: "2",
      name: "Machine Learning & AI",
      description:
        "Sharing research, papers, and discussions about ML and AI advancements",
      members: 3456,
      posts: 892,
      category: "AI",
      isJoined: true,
      trending: true,
    },
    {
      id: "3",
      name: "CRISPR Gene Editing",
      description:
        "Latest research and ethical discussions about CRISPR technology",
      members: 892,
      posts: 234,
      category: "Biology",
      isJoined: false,
      trending: false,
    },
    {
      id: "4",
      name: "Climate Science",
      description:
        "Climate modeling, data analysis, and environmental research",
      members: 1567,
      posts: 456,
      category: "Engineering",
      isJoined: false,
      trending: true,
    },
    {
      id: "5",
      name: "Neuroscience Advances",
      description: "Brain research, neural networks, and cognitive science",
      members: 987,
      posts: 312,
      category: "Medicine",
      isJoined: false,
      trending: false,
    },
    {
      id: "6",
      name: "Materials Science",
      description: "Novel materials, nanotechnology, and material properties",
      members: 743,
      posts: 198,
      category: "Chemistry",
      isJoined: false,
      trending: false,
    },
  ]);

  const toggleJoin = (groupId: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, isJoined: !group.isJoined } : group,
      ),
    );
  };

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Grupy tematyczne
          </h1>
          <p className="text-sm text-muted-foreground">
            Dołącz do grup naukowych i dyskutuj z innymi badaczami
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj grup..."
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                "bg-background border-border text-foreground focus:ring-ring",
              )}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Kategoria:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                  selectedCategory === category
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-surface border-border text-muted-foreground",
                )}
              >
                {category === "all" ? "Wszystkie" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className={cn(
                "rounded-xl border overflow-hidden transition-all hover:shadow-lg",
                "bg-card",
                group.trending ? "border-primary" : "border-border",
              )}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-card-foreground">
                        {group.name}
                      </h3>
                      {group.trending && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          TRENDING
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-4 text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{group.members.toLocaleString()} członków</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{group.posts} postów</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary">
                    {group.category}
                  </span>
                  <button
                    onClick={() => toggleJoin(group.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      group.isJoined
                        ? "border border-border"
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    {group.isJoined ? (
                      <>
                        <Users className="w-4 h-4 inline mr-1" />
                        Dołączono
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 inline mr-1" />
                        Dołącz
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2 text-foreground">
              Nie znaleziono grup
            </p>
            <p className="text-sm text-muted-foreground">
              Spróbuj zmienić kryteria wyszukiwania
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
