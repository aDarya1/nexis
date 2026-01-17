import type { Article } from "../types/article";

export const searchDatabase: Article[] = [
  // Quantum Physics Articles
  {
    id: 1001,
    title: "Quantum Computing with Superconducting Qubits: A Practical Guide",
    authors: ["Dr. Peter Shor", "Prof. John Preskill"],
    abstract:
      "We present a comprehensive review of superconducting qubit technologies, including transmon qubits, flux qubits, and novel architectures. Our analysis covers error rates, coherence times, and scalability challenges in building practical quantum computers.",
    tags: ["#QuantumComputing", "#Physics", "#Superconductors"],
    doi: "10.1038/s41586-2024-11111",
    likes: 3421,
    comments: 892,
    saves: 2134,
    time: "2 days ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peter",
    imageUrl:
      "https://images.unsplash.com/photo-1721066115321-eb0eec055296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0ZXIlMjBwcm9jZXNzb3J8ZW58MXx8fHwxNzY3NzkxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "TRENDING",
    contentType: "PDF",
    featured: true,
  },
  {
    id: 1002,
    title:
      "Quantum Entanglement in Biological Systems: Evidence and Implications",
    authors: ["Dr. Elena Rodriguez", "Prof. Marcus Chen"],
    abstract:
      "Recent discoveries suggest that quantum entanglement may play a crucial role in biological processes, particularly in photosynthesis and avian navigation. This paper presents experimental evidence supporting quantum coherence in living organisms.",
    tags: ["#QuantumPhysics", "#Biology", "#Entanglement"],
    doi: "10.48550/arXiv.2024.12345",
    likes: 2847,
    comments: 567,
    saves: 1543,
    time: "1 week ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    imageUrl:
      "https://images.unsplash.com/photo-1755455840466-85747052a634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwcGh5c2ljcyUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzY3NzkxNjY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "OPEN ACCESS",
    contentType: "PDF",
  },
  {
    id: 1003,
    title: "The Future of Quantum Algorithms: From Theory to Implementation",
    authors: ["Prof. Lov Grover", "Dr. Aram Harrow"],
    abstract:
      "We explore the landscape of quantum algorithms, from Shor's factoring algorithm to recent developments in quantum machine learning and optimization. This work provides a roadmap for algorithm development in the NISQ era.",
    tags: ["#QuantumAlgorithms", "#ComputerScience", "#Optimization"],
    doi: "10.1145/quantum.2024.789",
    likes: 1923,
    comments: 421,
    saves: 1087,
    time: "2 weeks ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lov",
    imageUrl:
      "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGdyYXBofGVufDF8fHx8MTc2Nzc3MzA3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    contentType: "PDF",
  },

  // AI/Machine Learning Articles
  {
    id: 2001,
    title: "Explainable AI for Medical Diagnosis: Trust Through Transparency",
    authors: ["Dr. Fei-Fei Li", "Prof. Andrew Ng"],
    abstract:
      "We present a novel framework for explainable AI in medical imaging that provides clinicians with interpretable insights into model decisions. Our approach combines attention mechanisms with counterfactual explanations to build trust in AI-assisted diagnosis.",
    tags: ["#AI", "#Medicine", "#ExplainableAI"],
    doi: "10.1056/NEJMoa2024567",
    likes: 4532,
    comments: 1243,
    saves: 3421,
    time: "3 days ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fei",
    imageUrl:
      "https://images.unsplash.com/photo-1738778344503-f6e0df318895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBtaWNyb3Njb3BlfGVufDF8fHx8MTc2NzcxNDY2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "TRENDING",
    contentType: "PDF",
    featured: true,
  },
  {
    id: 2002,
    title:
      "Ethical Considerations in AI Development: A Framework for Responsible Innovation",
    authors: ["Prof. Timnit Gebru", "Dr. Kate Crawford"],
    abstract:
      "This paper proposes a comprehensive ethical framework for AI development, addressing bias, fairness, accountability, and transparency. We examine case studies from facial recognition, hiring algorithms, and criminal justice systems.",
    tags: ["#AI", "#Ethics", "#Fairness"],
    doi: "10.1145/ethics.ai.2024",
    likes: 3876,
    comments: 987,
    saves: 2543,
    time: "5 days ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Timnit",
    imageUrl:
      "https://images.unsplash.com/photo-1762279389045-110301edeecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHNjaWVuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Nzc5MTY3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "OPEN ACCESS",
    contentType: "PDF",
  },
  {
    id: 2003,
    title:
      "Neural Architecture Search Optimization Using Evolutionary Algorithms",
    authors: ["Dr. Quoc Le", "Prof. Barret Zoph"],
    abstract:
      "We introduce an evolutionary approach to neural architecture search that discovers high-performance network architectures with minimal human intervention. Our method achieves state-of-the-art results on ImageNet while reducing search time by 70%.",
    tags: ["#MachineLearning", "#NAS", "#AutoML"],
    doi: "10.48550/arXiv.2024.33333",
    likes: 2341,
    comments: 543,
    saves: 1432,
    time: "1 week ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quoc",
    imageUrl:
      "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3Njc3NTEzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    contentType: "PDF",
  },

  // Climate Science Articles
  {
    id: 3001,
    title:
      "Climate Modeling with Neural Networks: Improving Prediction Accuracy",
    authors: ["Prof. James Chen", "Dr. Sofia Martinez", "Dr. Raj Patel"],
    abstract:
      "We present a novel deep learning architecture that significantly improves the accuracy of climate predictions by analyzing historical data combined with real-time atmospheric measurements. Our model achieves 95% accuracy in predicting temperature anomalies 10 years ahead.",
    tags: ["#ClimateScience", "#MachineLearning", "#Prediction"],
    doi: "10.1038/s41558-2024-08456",
    likes: 3654,
    comments: 876,
    saves: 2234,
    time: "4 days ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    imageUrl:
      "https://images.unsplash.com/photo-1756756412200-f4721d505d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwZGF0YSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzY3NzI1NTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "TRENDING",
    contentType: "DATASET",
    featured: true,
  },
  {
    id: 3002,
    title: "Carbon Capture Technologies: A Comprehensive Review of DAC Systems",
    authors: ["Dr. Klaus Lackner", "Prof. Jennifer Wilcox"],
    abstract:
      "This comprehensive review examines direct air capture (DAC) technologies for removing CO2 from the atmosphere. We analyze efficiency, cost, scalability, and environmental impact of current and emerging DAC systems.",
    tags: ["#ClimateChange", "#CarbonCapture", "#Sustainability"],
    doi: "10.1016/j.energy.2024.567",
    likes: 2987,
    comments: 654,
    saves: 1876,
    time: "1 week ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Klaus",
    imageUrl:
      "https://images.unsplash.com/photo-1745237497721-5e6c13a171ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBtb2xlY3VsYXIlMjBtb2RlbHxlbnwxfHx8fDE3Njc3OTE5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "OPEN ACCESS",
    contentType: "PDF",
  },

  // CRISPR/Genetics Articles
  {
    id: 4001,
    title:
      "CRISPR-Cas9 Applications in Agriculture: Engineering Climate-Resilient Crops",
    authors: ["Dr. Jennifer Doudna", "Prof. Feng Zhang"],
    abstract:
      "We demonstrate the use of CRISPR-Cas9 gene editing to develop crops resistant to drought, heat stress, and diseases. Our engineered varieties show 40% yield improvement under climate stress conditions while maintaining nutritional quality.",
    tags: ["#CRISPR", "#Agriculture", "#GeneEditing"],
    doi: "10.1126/science.2024.5432",
    likes: 2765,
    comments: 543,
    saves: 1654,
    time: "6 days ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    imageUrl:
      "https://images.unsplash.com/photo-1717501218003-3c89682cfb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBtb2xlY3VsZSUyMHN0cnVjdHVyZXxlbnwxfHx8fDE3Njc2ODAyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "NEW",
    contentType: "PDF",
  },
  {
    id: 4002,
    title: "Precision Medicine with CRISPR: Treating Genetic Disorders",
    authors: ["Dr. Emmanuelle Charpentier", "Prof. David Liu"],
    abstract:
      "We report successful clinical trials using CRISPR base editing to treat sickle cell anemia and beta-thalassemia. Our approach achieves 99.5% editing efficiency with no detected off-target effects in 45 patients.",
    tags: ["#CRISPR", "#Medicine", "#GeneTherapy"],
    doi: "10.1056/NEJMoa2024789",
    likes: 4321,
    comments: 1098,
    saves: 2987,
    time: "3 days ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuelle",
    imageUrl:
      "https://images.unsplash.com/photo-1709227371218-35ef4d1d91f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwc3RydWN0dXJlJTIwYmlvbG9neXxlbnwxfHx8fDE3Njc3OTE5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "TRENDING",
    contentType: "VIDEO",
    featured: true,
  },

  // Astrophysics Articles
  {
    id: 5001,
    title: "Detecting Exoplanets in the Habitable Zone with Machine Learning",
    authors: ["Dr. Sara Seager", "Prof. Dimitar Sasselov"],
    abstract:
      "Our machine learning pipeline analyzes TESS and JWST data to identify exoplanet candidates in habitable zones. We discovered 23 new Earth-sized planets with conditions potentially suitable for liquid water.",
    tags: ["#Astrophysics", "#Exoplanets", "#AI"],
    doi: "10.3847/apj.2024.12345",
    likes: 2134,
    comments: 432,
    saves: 1234,
    time: "1 week ago",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    imageUrl:
      "https://images.unsplash.com/photo-1619207244327-25ed246196f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHRlbGVzY29wZSUyMGFzdHJvbm9teXxlbnwxfHx8fDE3Njc3OTE5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    contentType: "PDF",
  },
];

// Interfejs dla opcji filtrowania wyszukiwania
export type SearchFilters = {
  peerReviewed?: boolean;
  openAccess?: boolean;
  dateRange?: { start: number; end: number };
  citationMin?: number;
  publicationType?: string[];
  searchBy?: "all" | "title" | "author"; // Opcja filtrowania po typie wyszukiwania
};

export function searchArticles(
  query: string,
  filters?: SearchFilters,
): Article[] {
  // Normalizuj zapytanie - usuń białe znaki i zamień na małe litery
  const normalizedQuery = query ? query.trim().toLowerCase() : "";

  // Jeśli brak zapytania i brak filtrów, zwróć wszystkie artykuły
  if (!normalizedQuery && (!filters || Object.keys(filters).length === 0)) {
    return searchDatabase;
  }

  let results = searchDatabase;

  // Filtrowanie po zapytaniu z opcją wyboru typu wyszukiwania
  if (normalizedQuery) {
    const searchBy = filters?.searchBy || "all";

    results = searchDatabase.filter((article) => {
      if (searchBy === "title") {
        // Wyszukiwanie tylko w tytule
        return article.title.toLowerCase().includes(normalizedQuery);
      } else if (searchBy === "author") {
        // Wyszukiwanie tylko w autorach - sprawdź każdego autora
        return article.authors.some((author) =>
          author.toLowerCase().includes(normalizedQuery),
        );
      } else {
        // Wyszukiwanie we wszystkich polach (domyślne)
        // Sprawdź tytuł, abstrakt, tagi i autorów
        const titleMatch = article.title
          .toLowerCase()
          .includes(normalizedQuery);
        const abstractMatch = article.abstract
          .toLowerCase()
          .includes(normalizedQuery);
        const tagsMatch = article.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery),
        );
        const authorsMatch = article.authors.some((author) =>
          author.toLowerCase().includes(normalizedQuery),
        );

        return titleMatch || abstractMatch || tagsMatch || authorsMatch;
      }
    });
  }

  // Zastosuj filtry jeśli zostały podane
  if (filters) {
    if (filters.peerReviewed) {
      results = results.filter((a) => a.contentType === "PDF");
    }
    if (filters.openAccess) {
      results = results.filter((a) => a.badge === "OPEN ACCESS");
    }
    if (filters.publicationType && filters.publicationType.length > 0) {
      results = results.filter((a) => {
        if (filters.publicationType!.includes("Preprint")) return true;
        if (filters.publicationType!.includes("Peer-reviewed"))
          return a.contentType === "PDF";
        if (filters.publicationType!.includes("Dataset"))
          return a.contentType === "DATASET";
        if (filters.publicationType!.includes("Code"))
          return a.contentType === "DATASET"; // Mapowanie dla Code
        if (filters.publicationType!.includes("Conference Paper"))
          return a.contentType === "PDF";
        return true;
      });
    }
    // Filtrowanie po zakresie dat (jeśli jest dostępne w danych)
    if (filters.dateRange) {
      // TODO: Implementuj filtrowanie po dacie gdy backend będzie dostarczał daty publikacji
      // Na razie pomijamy to filtrowanie, ponieważ dane mock nie zawierają pełnych dat
    }
    // Filtrowanie po minimalnej liczbie cytowań
    if (filters.citationMin !== undefined && filters.citationMin > 0) {
      results = results.filter((a) => a.likes >= filters.citationMin!);
    }
  }

  return results;
}

// Get popular search suggestions
export function getPopularSearches(): string[] {
  return ["quantum", "AI", "climate", "CRISPR"];
}

// Get article count for a specific query
export function getResultCount(query: string): number {
  return searchArticles(query).length;
}
