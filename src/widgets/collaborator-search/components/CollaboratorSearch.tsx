import {
  UserSearch,
  Mail,
  MapPin,
  Briefcase,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/utils/cn";

type Collaborator = {
  id: string;
  name: string;
  title: string;
  field: string;
  location: string;
  institution: string;
  avatar: string;
  expertise: string[];
  publications: number;
  hIndex: number;
  available: boolean;
};

export function CollaboratorSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string>("all");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);

  const fields = [
    "all",
    "AI",
    "Physics",
    "Biology",
    "Chemistry",
    "Medicine",
    "Engineering",
  ];
  const allExpertise = [
    "Machine Learning",
    "Quantum Computing",
    "CRISPR",
    "Neuroscience",
    "Climate Science",
    "Materials Science",
  ];

  const [collaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Dr. Elena Rodriguez",
      title: "Senior Research Scientist",
      field: "Physics",
      location: "San Francisco, USA",
      institution: "Stanford University",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      expertise: ["Quantum Computing", "Machine Learning"],
      publications: 87,
      hIndex: 42,
      available: true,
    },
    {
      id: "2",
      name: "Prof. James Chen",
      title: "Professor of Computer Science",
      field: "AI",
      location: "Cambridge, UK",
      institution: "University of Cambridge",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      expertise: ["Machine Learning", "Neural Networks"],
      publications: 156,
      hIndex: 68,
      available: true,
    },
    {
      id: "3",
      name: "Dr. Maya Thompson",
      title: "Research Fellow",
      field: "Biology",
      location: "Boston, USA",
      institution: "MIT",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      expertise: ["CRISPR", "Gene Editing"],
      publications: 43,
      hIndex: 28,
      available: false,
    },
    {
      id: "4",
      name: "Prof. David Kim",
      title: "Professor of Materials Science",
      field: "Engineering",
      location: "Seoul, South Korea",
      institution: "KAIST",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      expertise: ["Materials Science", "Nanotechnology"],
      publications: 112,
      hIndex: 55,
      available: true,
    },
  ]);

  const filteredCollaborators = collaborators.filter((collab) => {
    const matchesSearch =
      collab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.expertise.some((exp) =>
        exp.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesField =
      selectedField === "all" || collab.field === selectedField;
    const matchesExpertise =
      selectedExpertise.length === 0 ||
      selectedExpertise.some((exp) => collab.expertise.includes(exp));
    return matchesSearch && matchesField && matchesExpertise;
  });

  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise],
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-secondary/20">
              <UserSearch className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Wyszukiwanie współpracowników
              </h1>
              <p className="text-sm text-muted-foreground">
                Znajdź badaczy do współpracy w projektach naukowych
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj po imieniu, instytucji lub ekspertyzie..."
                className={cn(
                  "w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                  "bg-background border-border text-foreground focus:ring-ring",
                )}
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Dziedzina:
                </span>
                {fields.map((field) => (
                  <button
                    key={field}
                    onClick={() => setSelectedField(field)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-sm font-medium transition-all border",
                      selectedField === field
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-surface border-border text-muted-foreground",
                    )}
                  >
                    {field === "all" ? "Wszystkie" : field}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">
                  Ekspertyza:
                </span>
                {allExpertise.map((exp) => (
                  <button
                    key={exp}
                    onClick={() => toggleExpertise(exp)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                      selectedExpertise.includes(exp)
                        ? "bg-secondary/20 border-secondary text-secondary"
                        : "bg-surface border-border text-muted-foreground",
                    )}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollaborators.map((collab) => (
            <div
              key={collab.id}
              className="rounded-xl border p-6 transition-all hover:shadow-lg bg-card"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={collab.avatar}
                  alt={collab.name}
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 text-card-foreground">
                    {collab.name}
                  </h3>
                  <p className="text-sm mb-1 text-muted-foreground">
                    {collab.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {collab.institution}
                    </p>
                  </div>
                </div>
                {collab.available && (
                  <span className="px-2 py-1 text-xs font-bold rounded-full bg-save text-save-foreground">
                    Dostępny
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {collab.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-2 text-muted-foreground">
                    Ekspertyza:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {collab.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Publikacje</p>
                    <p className="font-semibold text-card-foreground">
                      {collab.publications}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">h-index</p>
                    <p className="font-semibold text-card-foreground">
                      {collab.hIndex}
                    </p>
                  </div>
                </div>
              </div>

              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                  collab.available
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
                disabled={!collab.available}
              >
                <Mail className="w-4 h-4" />
                {collab.available ? "Skontaktuj się" : "Niedostępny"}
              </button>
            </div>
          ))}
        </div>

        {filteredCollaborators.length === 0 && (
          <div className="text-center py-12">
            <UserSearch className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2 text-foreground">
              Nie znaleziono współpracowników
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
