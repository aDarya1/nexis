import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { Article } from "@/shared/types/article";

import {
  selectApp,
  setScreen,
  setPublishModal,
  setSelectedArticle,
  addNewArticle,
  setSearchQuery,
  addDownloadedArticle,
  showToast,
} from "@/features/app/appSlice";
import { ArticleDetail } from "@/features/article/components/ArticleDetail";
import { ConferenceCalendar } from "@/features/conference/components/ConferenceCalendar";
import { SavedArticlesLibrary } from "@/features/library/components/SavedArticlesLibrary";
import { UserProfile } from "@/features/profile/components/UserProfile";
import { PublishModal } from "@/features/publish/components/PublishModal";
import { SearchResults } from "@/features/search/components/SearchResults";
import { CollaboratorSearch } from "@/widgets/collaborator-search/components/CollaboratorSearch";
import { Footer } from "@/widgets/footer/components/Footer";
import { MobileHeader } from "@/widgets/header/components/MobileHeader";
import { HomeFeed } from "@/widgets/home-feed/components/HomeFeed";
import { LibraryDownloads } from "@/widgets/library-downloads/components/LibraryDownloads";
import { MobileSidebar } from "@/widgets/sidebar/components/MobileSidebar";
import { TopicGroups } from "@/widgets/topic-groups/components/TopicGroups";
import { WeatherWidget } from "@/widgets/weather/components/WeatherWidget";

export function MobileApp() {
  const dispatch = useDispatch();
  const state = useSelector(selectApp);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleDownload = async (article: Article) => {
    try {
      const { downloadArticleAsPDF } =
        await import("@/shared/utils/downloadArticle");
      await downloadArticleAsPDF(article);
      const updatedArticle = { ...article, isDownloaded: true };
      if (!state.downloadedArticles.find((a) => a.id === article.id)) {
        dispatch(addDownloadedArticle(updatedArticle));
      }
      dispatch(showToast("Artykuł pobrany na urządzenie"));
    } catch (error) {
      console.error("Błąd podczas pobierania:", error);
      dispatch(
        showToast(
          error instanceof Error
            ? error.message
            : "Nie udało się pobrać artykułu",
        ),
      );
    }
  };

  const handlePublish = (articleData: {
    title: string;
    authors: string[];
    abstract: string;
    tags: string[];
  }) => {
    const newArticle: Article = {
      id: Date.now(),
      title: articleData.title,
      authors: articleData.authors,
      abstract: articleData.abstract,
      tags: articleData.tags,
      doi: `10.48550/arXiv.${Date.now()}`,
      likes: 0,
      comments: 0,
      saves: 0,
      time: "Just now",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      isSaved: false,
    };
    dispatch(addNewArticle(newArticle));
    dispatch(setPublishModal(false));
  };

  const handleArticleClick = (article: Article) => {
    dispatch(setSelectedArticle(article));
    dispatch(setScreen("article-detail"));
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(setScreen("search"));
  };

  return (
    <div
      className="min-h-screen w-full max-w-full flex flex-col transition-colors duration-300 overflow-x-hidden bg-background"
    >
      <MobileHeader
        onMenuClick={() => setShowMobileMenu(true)}
        onSearch={handleSearch}
      />

      <MobileSidebar
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        currentScreen={state.currentScreen}
        onNavigate={(screen) => dispatch(setScreen(screen))}
      />

      <main className="flex-1 pt-14 md:pt-16 flex flex-col w-full overflow-x-hidden">
        {state.currentScreen === "home" && (
          <HomeFeed
            newArticles={state.newArticles}
            onArticleClick={handleArticleClick}
            onDownload={handleDownload}
          />
        )}

        {state.currentScreen === "search" && (
          <SearchResults
            searchQuery={state.searchQuery}
            onArticleClick={handleArticleClick}
            onDownload={handleDownload}
          />
        )}

        {state.currentScreen === "library" && (
          <SavedArticlesLibrary
            onArticleClick={handleArticleClick}
            onDownload={handleDownload}
          />
        )}

        {state.currentScreen === "groups" && <TopicGroups />}

        {state.currentScreen === "calendar" && <ConferenceCalendar />}

        {state.currentScreen === "collaborators" && <CollaboratorSearch />}

        {state.currentScreen === "weather" && <WeatherWidget />}

        {state.currentScreen === "downloads" && (
          <LibraryDownloads
            downloadedArticles={state.downloadedArticles}
            onArticleClick={handleArticleClick}
          />
        )}

        {state.currentScreen === "notifications" && (
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">
              Notifications
            </h1>
            <p className="text-muted-foreground">You&apos;re all caught up!</p>
          </div>
        )}

        {state.currentScreen === "profile" && (
          <UserProfile onArticleClick={handleArticleClick} />
        )}

        {state.currentScreen === "article-detail" && state.selectedArticle && (
          <ArticleDetail
            article={state.selectedArticle}
            onBack={() => dispatch(setScreen("home"))}
            onDownload={handleDownload}
          />
        )}
      </main>

      <Footer />

      {state.showPublishModal && (
        <PublishModal
          onClose={() => dispatch(setPublishModal(false))}
          onSubmit={handlePublish}
        />
      )}

      {state.showToast && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">
          {state.toastMessage}
        </div>
      )}
    </div>
  );
}
