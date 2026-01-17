import { FileText, TrendingUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/utils/cn";
import { type Article } from "@/shared/types/article";

import { ArticleCard } from "@/features/article/components/ArticleCard";
type HomeFeedProps = {
  newArticles: Article[];
  onArticleClick: (article: Article) => void;
  onDownload: (article: Article) => void;
};

export function HomeFeed({
  newArticles,
  onArticleClick,
  onDownload,
}: HomeFeedProps) {
  const [activeTab, setActiveTab] = useState<"following" | "trending">(
    "following",
  );

  const defaultArticles: Article[] = [
    {
      id: 1,
      title:
        "Neural Networks for Protein Folding Prediction: AlphaFold3 and Beyond",
      authors: ["Dr. Elena Rodriguez", "Prof. Marcus Chen", "Dr. Sarah Kim"],
      abstract:
        "Recent discoveries suggest that quantum entanglement may play a crucial role in biological processes, particularly in photosynthesis and avian navigation. This paper presents experimental evidence supporting quantum coherence in microtubule structures within neurons, potentially revolutionizing our understanding of consciousness and information processing in living organisms.",
      tags: ["#AI", "#Bioinformatics", "#ProteinFolding"],
      doi: "10.48550/arXiv.2024.12345",
      likes: 1247,
      comments: 234,
      saves: 892,
      time: "1 hour ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      imageUrl:
        "https://images.unsplash.com/photo-1709227371218-35ef4d1d91f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwc3RydWN0dXJlJTIwYmlvbG9neXxlbnwxfHx8fDE3Njc3OTE5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "TRENDING",
      contentType: "PDF",
      featured: true,
      layout: "featured",
    },
    {
      id: 2,
      title:
        "Quantum Computing Breakthrough: 1000-Qubit Processor Achieves Quantum Supremacy",
      authors: ["Prof. James Chen", "Dr. Sofia Martinez"],
      abstract:
        "We present a groundbreaking 1000-qubit quantum processor that demonstrates quantum supremacy on real-world computational problems. Our system achieves error rates below 0.1% through novel error correction algorithms and topological qubit architectures.",
      tags: ["#QuantumComputing", "#Physics", "#ComputerScience"],
      doi: "10.1038/s41586-2024-08456",
      likes: 2341,
      comments: 567,
      saves: 1543,
      time: "2 hours ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      imageUrl:
        "https://images.unsplash.com/photo-1721066115321-eb0eec055296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0ZXIlMjBwcm9jZXNzb3J8ZW58MXx8fHwxNzY3NzkxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "NEW",
      contentType: "PDF",
      layout: "default",
    },
    {
      id: 3,
      title:
        "CRISPR 3.0: Enhanced Precision Genome Editing with Minimal Off-Target Effects",
      authors: ["Dr. Maya Thompson", "Prof. Lin Wei"],
      abstract:
        "Building upon CRISPR-Cas9 technology, we introduce CRISPR 3.0—an advanced gene-editing platform with 99.97% targeting accuracy and virtually eliminated off-target mutations. This breakthrough has immediate implications for treating genetic disorders.",
      tags: ["#Biotechnology", "#GeneEditing", "#CRISPR"],
      doi: "10.1126/science.2024.9876",
      likes: 1876,
      comments: 423,
      saves: 967,
      time: "5 hours ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      imageUrl:
        "https://images.unsplash.com/photo-1717501218003-3c89682cfb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBtb2xlY3VsZSUyMHN0cnVjdHVyZXxlbnwxfHx8fDE3Njc2ODAyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "OPEN ACCESS",
      contentType: "VIDEO",
      layout: "compact",
    },
    {
      id: 4,
      title:
        "Climate Change Modeling 2024: AI-Driven Predictions with 95% Accuracy",
      authors: ["Dr. Alex Kumar", "Prof. Lisa Park", "Dr. Raj Patel"],
      abstract:
        "We present a novel deep learning architecture that significantly improves the accuracy of climate predictions by analyzing historical data combined with real-time atmospheric measurements. Our model achieves 95% accuracy in predicting temperature anomalies.",
      tags: ["#ClimateScience", "#MachineLearning", "#DataScience"],
      doi: "10.1038/s41586-2024-07890",
      likes: 1543,
      comments: 312,
      saves: 876,
      time: "8 hours ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      imageUrl:
        "https://images.unsplash.com/photo-1756756412200-f4721d505d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwZGF0YSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzY3NzI1NTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      contentType: "DATASET",
      layout: "default",
    },
    {
      id: 5,
      title:
        "Deep Learning Revolutionizes Astronomical Object Detection in JWST Data",
      authors: ["Dr. Maria Santos", "Prof. Tom Harrison"],
      abstract:
        "Our neural network architecture processes James Webb Space Telescope imagery to identify previously unknown celestial objects with unprecedented accuracy. We discovered 47 new exoplanet candidates in the habitable zone.",
      tags: ["#Astronomy", "#AI", "#SpaceScience"],
      doi: "10.48550/arXiv.2024.45678",
      likes: 2103,
      comments: 445,
      saves: 1234,
      time: "12 hours ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      imageUrl:
        "https://images.unsplash.com/photo-1619207244327-25ed246196f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHRlbGVzY29wZSUyMGFzdHJvbm9teXxlbnwxfHx8fDE3Njc3OTE5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "TRENDING",
      contentType: "PDF",
      layout: "default",
    },
    {
      id: 6,
      title:
        "Cancer Cell Detection Using Advanced Microscopy and Computer Vision",
      authors: ["Dr. Emily Zhang", "Prof. Robert Lee"],
      abstract:
        "We developed an AI-powered microscopy system that detects cancer cells with 98.7% accuracy in real-time. The system combines advanced imaging techniques with deep learning to identify malignant cells at early stages.",
      tags: ["#Medicine", "#ComputerVision", "#Oncology"],
      doi: "10.1016/j.cell.2024.03.012",
      likes: 1654,
      comments: 289,
      saves: 743,
      time: "1 day ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      imageUrl:
        "https://images.unsplash.com/photo-1738778344503-f6e0df318895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBtaWNyb3Njb3BlfGVufDF8fHx8MTc2NzcxNDY2OXww&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "OPEN ACCESS",
      contentType: "VIDEO",
      layout: "compact",
    },
    {
      id: 7,
      title:
        "Next-Generation Solar Cells Achieve 47% Efficiency Using Perovskite Materials",
      authors: ["Prof. David Kim", "Dr. Anna Kowalski"],
      abstract:
        "We present a breakthrough in photovoltaic technology using multi-junction perovskite solar cells that achieve 47% power conversion efficiency, nearly double the current commercial standard. This advancement could revolutionize renewable energy.",
      tags: ["#RenewableEnergy", "#Materials", "#CleanTech"],
      doi: "10.1038/s41560-2024-01234",
      likes: 1987,
      comments: 356,
      saves: 1021,
      time: "1 day ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      imageUrl:
        "https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhcnxlbnwxfHx8fDE3Njc3MDg5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "NEW",
      contentType: "PDF",
      layout: "default",
    },
    {
      id: 8,
      title:
        "Autonomous Robotic Surgery System Outperforms Human Surgeons in Precision",
      authors: ["Dr. Sarah Johnson", "Prof. Michael Brown"],
      abstract:
        "Our AI-driven robotic surgical system demonstrates superior precision and reduced recovery times in clinical trials. The system uses real-time computer vision and haptic feedback to perform complex procedures with sub-millimeter accuracy.",
      tags: ["#Robotics", "#Medicine", "#AI"],
      doi: "10.1126/scirobotics.2024.5678",
      likes: 1432,
      comments: 267,
      saves: 654,
      time: "2 days ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      imageUrl:
        "https://images.unsplash.com/photo-1581092335331-5e00ac65e934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nfGVufDF8fHx8MTc2Nzc5MTk1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      contentType: "VIDEO",
      layout: "compact",
    },
    {
      id: 9,
      title: "Novel Catalyst Design Enables Direct CO2 Conversion to Jet Fuel",
      authors: ["Prof. Jennifer Liu", "Dr. Ahmed Hassan"],
      abstract:
        "We synthesized a novel molecular catalyst that converts atmospheric CO2 directly into jet fuel with 82% efficiency. This carbon-negative process could transform aviation industry sustainability.",
      tags: ["#Chemistry", "#ClimateChange", "#GreenEnergy"],
      doi: "10.1021/jacs.2024.12345",
      likes: 1765,
      comments: 298,
      saves: 834,
      time: "2 days ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
      imageUrl:
        "https://images.unsplash.com/photo-1745237497721-5e6c13a171ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBtb2xlY3VsYXIlMjBtb2RlbHxlbnwxfHx8fDE3Njc3OTE5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "OPEN ACCESS",
      contentType: "PDF",
      layout: "default",
    },
    {
      id: 10,
      title:
        "Brain-Computer Interface Allows Paralyzed Patients to Control Prosthetics",
      authors: ["Dr. Mark Wilson", "Prof. Anna Petrova"],
      abstract:
        "Our non-invasive brain-computer interface enables paralyzed patients to control prosthetic limbs with natural movement patterns. Clinical trials show 94% accuracy in translating neural signals to mechanical actions.",
      tags: ["#Neuroscience", "#BCI", "#Medicine"],
      doi: "10.1038/s41593-2024-09876",
      likes: 2456,
      comments: 512,
      saves: 1432,
      time: "3 days ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
      imageUrl:
        "https://images.unsplash.com/photo-1549925245-f20a1bac6454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyMG5ldXJvc2NpZW5jZSUyMHNjYW58ZW58MXx8fHwxNzY3NzkxOTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "TRENDING",
      contentType: "VIDEO",
      featured: true,
      layout: "featured",
    },
    {
      id: 11,
      title:
        "Satellite-Based AI System Detects Illegal Deforestation in Real-Time",
      authors: ["Dr. Carlos Rivera", "Prof. Nina Schmidt"],
      abstract:
        "Our machine learning system analyzes satellite imagery to detect illegal deforestation activities within 24 hours, enabling rapid response. The system has identified over 10,000 illegal logging sites across the Amazon.",
      tags: ["#RemoteSensing", "#AI", "#Conservation"],
      doi: "10.1016/j.rse.2024.04.567",
      likes: 1543,
      comments: 234,
      saves: 678,
      time: "3 days ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      imageUrl:
        "https://images.unsplash.com/photo-1633421878925-ac220d8f6e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBlYXJ0aCUyMG9ic2VydmF0aW9ufGVufDF8fHx8MTc2Nzc5MTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      contentType: "DATASET",
      layout: "default",
    },
    {
      id: 12,
      title:
        "Transformer Neural Networks Achieve Human-Level Language Understanding",
      authors: ["Prof. Alan Turing", "Dr. Ada Lovelace"],
      abstract:
        "We demonstrate that large-scale transformer models can achieve human-level performance on complex language understanding tasks, including reasoning, factual knowledge, and nuanced context interpretation across 50+ languages.",
      tags: ["#NLP", "#AI", "#DeepLearning"],
      doi: "10.48550/arXiv.2024.99999",
      likes: 3214,
      comments: 789,
      saves: 2103,
      time: "4 days ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alan",
      imageUrl:
        "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3Njc3NTEzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      badge: "TRENDING",
      contentType: "PDF",
      layout: "compact",
    },
  ];

  const allArticles = [...newArticles, ...defaultArticles];

  // Filter articles based on active tab
  const filteredArticles =
    activeTab === "trending"
      ? allArticles
          .filter(
            (article) => article.badge === "TRENDING" || article.likes > 1500,
          )
          .sort((a, b) => b.likes - a.likes)
      : allArticles;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Latest Research
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("following")}
            className={cn(
              "px-4 py-2 border rounded-lg text-sm font-medium transition-all",
              activeTab === "following"
                ? "bg-gray-200 border-primary text-primary dark:bg-gray-700"
                : "bg-transparent border-border text-muted-foreground",
            )}
          >
            Following
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={cn(
              "px-4 py-2 border rounded-lg text-sm font-medium transition-all flex items-center gap-1",
              activeTab === "trending"
                ? "bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-900/20"
                : "bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
            onMouseEnter={(e) => {
              if (activeTab !== "trending") {
                e.currentTarget.classList.add("bg-accent", "text-foreground");
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "trending") {
                e.currentTarget.classList.remove(
                  "bg-accent",
                  "text-foreground",
                );
              }
            }}
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onArticleClick={onArticleClick}
            onDownload={onDownload}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-32 h-32 mb-6 rounded-full flex items-center justify-center bg-accent">
            <TrendingUp className="w-16 h-16 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            No trending articles yet
          </h3>
          <p className="text-sm text-center max-w-md text-muted-foreground">
            Check back later for trending research articles in your field
          </p>
        </div>
      )}
    </div>
  );
}
