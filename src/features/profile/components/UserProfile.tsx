import {
  Settings,
  MapPin,
  Link as LinkIcon,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectProfile, updateProfile } from "../profileSlice";

import { EditProfileModal } from "./EditProfileModal";

import type { Article } from "@/shared/types/article";
import type { Author } from "@/shared/types/author";

import { ArticleCard } from "@/features/article/components/ArticleCard";
import { selectFollow, toggleFollow } from "@/features/follow/followSlice";
import { cn } from "@/shared/utils/cn";

type UserProfileProps = {
  onArticleClick: (article: Article) => void;
};

export function UserProfile({ onArticleClick }: UserProfileProps) {
  const dispatch = useDispatch();
  const { profile } = useSelector(selectProfile);
  const following = useSelector(selectFollow).followedAuthors;
  const [activeTab, setActiveTab] = useState<
    "publications" | "saved" | "following"
  >("publications");
  const [showEditModal, setShowEditModal] = useState(false);

  const myPublications: Article[] = [
    {
      id: 201,
      title: "Advanced Quantum Computing Architectures for Machine Learning",
      authors: ["You", "Dr. Emily Chen"],
      abstract:
        "We present novel quantum computing architectures optimized for machine learning workloads, achieving significant speedups in training deep neural networks.",
      tags: ["#QuantumComputing", "#MachineLearning", "#AI"],
      doi: "10.48550/arXiv.2024.11111",
      likes: 156,
      comments: 43,
      saves: 89,
      time: "2 weeks ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      imageUrl:
        "https://images.unsplash.com/photo-1755455840466-85747052a634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwcGh5c2ljcyUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzY3NzkxNjY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const savedArticles: Article[] = [
    {
      id: 1,
      title: "Quantum Entanglement in Biological Systems: A New Paradigm",
      authors: ["Dr. Elena Rodriguez", "Prof. Marcus Chen"],
      abstract:
        "Recent discoveries suggest that quantum entanglement may play a crucial role in biological processes...",
      tags: ["#QuantumPhysics", "#Neuroscience", "#Biology"],
      doi: "10.48550/arXiv.2024.12345",
      likes: 342,
      comments: 87,
      saves: 156,
      time: "2 hours ago",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      isSaved: true,
      imageUrl:
        "https://images.unsplash.com/photo-1755455840466-85747052a634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwcGh5c2ljcyUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzY3NzkxNjY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  // Konwertuj dane obserwowanych autorów do formatu Author
  const followingAuthors: Author[] = following.map((authorId, index) => ({
    id: authorId,
    name: `Author ${index + 1}`,
    field: "Research",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorId}`,
  }));

  const isFollowing = (authorId: string) => following.includes(authorId);

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Profile Header */}
      <div className="bg-surface rounded-lg border border-border p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-primary/30"
            />
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                {profile.name}
              </h1>
              <p className="text-text-secondary mb-3">{profile.bio}</p>
              <div className="flex items-center gap-4 text-sm text-text-secondary flex-wrap">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                )}
                {profile.website && (
                  <a
                    href={
                      profile.website.startsWith("http")
                        ? profile.website
                        : `https://${profile.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {profile.website}
                  </a>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-bg border border-border text-text-primary rounded-lg hover:border-primary hover:text-primary transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>EDYTUJ PROFIL</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">12</div>
            <div className="text-sm text-text-secondary">Publications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">1.2K</div>
            <div className="text-sm text-text-secondary">Citations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-fuchsia-500 mb-1">234</div>
            <div className="text-sm text-text-secondary">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">89</div>
            <div className="text-sm text-text-secondary">Following</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("publications")}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all",
            activeTab === "publications"
              ? "bg-primary/10 border-2 border-primary text-primary shadow-[0_0_15px_rgba(0,238,255,0.2)]"
              : "bg-surface border-2 border-border text-text-secondary hover:text-white",
          )}
        >
          MY PUBLICATIONS
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all",
            activeTab === "saved"
              ? "bg-primary/10 border-2 border-primary text-primary shadow-[0_0_15px_rgba(0,238,255,0.2)]"
              : "bg-surface border-2 border-border text-text-secondary hover:text-white",
          )}
        >
          SAVED PAPERS
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all",
            activeTab === "following"
              ? "bg-primary/10 border-2 border-primary text-primary shadow-[0_0_15px_rgba(0,238,255,0.2)]"
              : "bg-surface border-2 border-border text-text-secondary hover:text-white",
          )}
        >
          FOLLOWING
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "publications" && (
          <>
            {myPublications.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onArticleClick={onArticleClick}
                onDownload={() => {}}
              />
            ))}
          </>
        )}

        {activeTab === "saved" && (
          <>
            {savedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onArticleClick={onArticleClick}
                onDownload={() => {}}
              />
            ))}
          </>
        )}

        {activeTab === "following" && (
          <div className="bg-card rounded-lg border border-border p-6">
            {followingAuthors.length > 0 ? (
              <div className="space-y-4">
                {followingAuthors.map((author) => {
                  const following = isFollowing(author.id);
                  return (
                    <div
                      key={author.id}
                      className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-8 h-8 rounded-full border-2 border-primary/30"
                        />
                        <div>
                          <h4 className="font-medium text-card-foreground">
                            {author.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {author.field}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch(toggleFollow(author.id))}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                          following
                            ? "border border-border"
                            : "bg-primary text-primary-foreground",
                        )}
                      >
                        {following ? (
                          <>
                            <UserMinus className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Przestań obserwować
                            </span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Obserwuj
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <UserPlus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Nie obserwujesz jeszcze nikogo
                </h3>
                <p className="text-muted-foreground mb-4">
                  Zacznij obserwować autorów, aby widzieć ich najnowsze
                  publikacje
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={async (data) => {
          dispatch(updateProfile(data));
          setShowEditModal(false);
        }}
        initialData={profile}
      />
    </div>
  );
}
