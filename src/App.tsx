import { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";

import { ConferenceCalendar } from "./features/conference/components/ConferenceCalendar";
import { SavedArticlesLibrary } from "./features/library/components/SavedArticlesLibrary";

import type { Article, Screen } from "@/shared/types/article";

import {
  selectApp,
  setScreen,
  setPublishModal,
  setSelectedArticle,
  addNewArticle,
  setSearchQuery,
  addDownloadedArticle,
  showToast,
  hideToast,
} from "@/features/app/appSlice";
import { ArticleDetail } from "@/features/article/components/ArticleDetail";
import { UserProfile } from "@/features/profile/components/UserProfile";
import { PublishModal } from "@/features/publish/components/PublishModal";
import { SearchResults } from "@/features/search/components/SearchResults";
import { useIsMobile } from "@/hooks/useDeviceType";
import { MobileApp } from "@/MobileApp";
import { store } from "@/store/store";
import { CollaboratorSearch } from "@/widgets/collaborator-search/components/CollaboratorSearch";
import { Footer } from "@/widgets/footer/components/Footer";
import { Header } from "@/widgets/header/components/Header";
import { HomeFeed } from "@/widgets/home-feed/components/HomeFeed";
import { LibraryDownloads } from "@/widgets/library-downloads/components/LibraryDownloads";
import { Sidebar } from "@/widgets/sidebar/components/Sidebar";
import { TopicGroups } from "@/widgets/topic-groups/components/TopicGroups";

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const state = useSelector(selectApp);

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

  useEffect(() => {
    const handleSearchEvent = (event: CustomEvent) => {
      dispatch(setSearchQuery(event.detail));
    };

    window.addEventListener(
      "performSearch",
      handleSearchEvent as EventListener,
    );

    return () => {
      window.removeEventListener(
        "performSearch",
        handleSearchEvent as EventListener,
      );
    };
  }, [dispatch]);

  useEffect(() => {
    if (state.showToast) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.showToast, dispatch]);

  if (isMobile) {
    return <MobileApp />;
  }

  // Desktop version - original layout
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onPublish={() => dispatch(setPublishModal(true))}
        onSearch={handleSearch}
      />

      <div className="flex flex-1">
        <Sidebar
          currentScreen={state.currentScreen}
          onNavigate={(screen: Screen) => dispatch(setScreen(screen))}
        />

        <main className="flex-1 ml-64 pt-20 flex flex-col">
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

          {state.currentScreen === "downloads" && (
            <LibraryDownloads
              downloadedArticles={state.downloadedArticles}
              onArticleClick={handleArticleClick}
            />
          )}

          {state.currentScreen === "notifications" && (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6 text-foreground">
                Notifications
              </h1>
              <p className="text-muted-foreground">
                You&apos;re all caught up!
              </p>
            </div>
          )}

          {state.currentScreen === "profile" && (
            <UserProfile onArticleClick={handleArticleClick} />
          )}

          {state.currentScreen === "article-detail" &&
            state.selectedArticle && (
              <ArticleDetail
                article={state.selectedArticle}
                onBack={() => dispatch(setScreen("home"))}
                onDownload={handleDownload}
              />
            )}
        </main>
      </div>

      <div className="ml-64">
        <Footer />
      </div>

      {state.showPublishModal && (
        <PublishModal
          onClose={() => dispatch(setPublishModal(false))}
          onSubmit={handlePublish}
        />
      )}

      {state.showToast && (
        <div className="fixed bottom-5 right-5 bg-save text-white px-4 py-2 rounded shadow">
          {state.toastMessage}
        </div>
      )}
    </div>
  );
}
