## Fix and improve the scientific articles search functionality
- Dodano filtrowanie po tytule i autorze (opcja "Szukaj w")
- Ulepszono obsługę błędów z wyświetlaniem komunikatów
- Dodano lepsze stany pustych wyników z sugestiami
- Dodano sortowanie po trafności, dacie i cytowaniach
- Zaktualizowano SearchDatabase.ts z lepszym filtrowaniem

## Add the ability to download articles to a local device
- Utworzono utils/downloadArticle.ts z funkcjami pobierania PDF, BibTeX i RIS
- Zaimplementowano pobieranie artykułów jako PDF (placeholder dla backendu)
- Dodano obsługę błędów podczas pobierania
- Zintegrowano pobieranie z ArticleDetail i ArticleCard
- Dodano sanityzację nazw plików

## Implement an accessibility mode for users with disabilities
- Rozszerzono ThemeProvider o ustawienia dostępności (high contrast, font size)
- Utworzono komponent AccessibilitySettings z UI
- Dodano tryb wysokiego kontrastu zgodny z WCAG AAA
- Zaimplementowano trzy rozmiary czcionek: normalny, duży, bardzo duży
- Dodano style CSS w globals.css dla trybu wysokiego kontrastu
- Zintegrowano ustawienia dostępności z Headerem
- Zapis ustawień w localStorage

## Add follow/unfollow functionality for authors
- Utworzono kontekst FollowContext do zarządzania obserwowanymi autorami
- Zaimplementowano funkcje follow/unfollow w UserProfile
- Dodano przyciski follow/unfollow w ArticleDetail
- Zintegrowano z localStorage (placeholder dla backendu)
- Dodano wizualne wskaźniki stanu obserwowania

## Enable user profile editing
- Utworzono komponent EditProfileModal z pełną walidacją formularza
- Zaimplementowano edycję: imię, bio, dziedzina, lokalizacja, strona, avatar
- Dodano walidację URL, rozmiaru pliku, długości tekstu
- Dodano preview avatara przed zapisem
- Zintegrowano z UserProfile
- Zapis danych w localStorage (placeholder dla backendu)

## Add user registration and login for the platform
- Utworzono AuthContext do zarządzania autentykacją użytkownika
- Zaimplementowano LoginModal i RegisterModal z walidacją
- Dodano przyciski logowania/rejestracji w Headerze
- Zintegrowano z localStorage (placeholder dla backendu)
- Dodano menu użytkownika z opcją wylogowania
- Przycisk PUBLISH widoczny tylko dla zalogowanych użytkowników

## Add "X" button to clear search query in search bar
- Dodano przycisk "X" w pasku wyszukiwania w Headerze
- Przycisk pojawia się gdy jest tekst w polu wyszukiwania
- Kliknięcie czyści zapytanie i pokazuje wszystkie artykuły

## Implement likes and comments on articles
- Zaimplementowano system polubień w ArticleCard i ArticleDetail
- Dodano sekcję komentarzy w ArticleDetail z możliwością dodawania komentarzy
- Komentarze mają polubienia i możliwość odpowiedzi
- Stan polubień i komentarzy zapisywany lokalnie (placeholder dla backendu)

## Add notifications system for new publications in user field
- Utworzono NotificationContext do zarządzania powiadomieniami
- Zaimplementowano NotificationsPanel z listą powiadomień
- Dodano przycisk powiadomień w Headerze z licznikiem nieprzeczytanych
- Powiadomienia o nowych publikacjach, komentarzach, polubieniach, obserwowaniach
- Możliwość oznaczania jako przeczytane i usuwania powiadomień

## Create scientific topic groups feature
- Utworzono komponent TopicGroups z listą grup naukowych
- Dodano możliwość dołączania do grup tematycznych
- Filtrowanie grup po kategorii i wyszukiwanie
- Wyświetlanie liczby członków i postów w każdej grupie
- Oznaczenie grup trending

## Enhance saved articles library functionality
- Utworzono komponent SavedArticlesLibrary z pełną funkcjonalnością
- Wyświetlanie zapisanych artykułów z możliwością wyszukiwania
- Filtrowanie po tagach
- Przełączanie między widokiem listy i siatki
- Zapis artykułów w localStorage (placeholder dla backendu)

## Add ability to share research articles
- Utworzono ShareModal z opcjami udostępniania
- Udostępnianie przez Email, Twitter, Facebook, LinkedIn
- Kopiowanie linku do schowka
- Zintegrowano z ArticleCard (gotowe do użycia)

## Create conference and event calendar
- Utworzono komponent ConferenceCalendar z listą wydarzeń naukowych
- Filtrowanie po typie (konferencja, warsztat, sympozjum, webinar) i dziedzinie
- Wyświetlanie daty, lokalizacji, liczby uczestników
- Wyszukiwanie wydarzeń
- Linki do stron wydarzeń

## Add collaborator search for research projects
- Utworzono komponent CollaboratorSearch do wyszukiwania współpracowników
- Filtrowanie po dziedzinie i ekspertyzie
- Wyświetlanie profilu badacza: publikacje, h-index, instytucja
- Oznaczenie dostępności do współpracy
- Możliwość kontaktu z badaczami

## Fix icon alignment and improve authentication UI
- Połączono logowanie i rejestrację w jeden modal z zakładkami (tabs)
- Naprawiono wyrównanie ikon - wszystkie ikony mają teraz rozmiar 24x24px (w-6 h-6)
- Użyto flexbox do poprawnego wyrównania ikon z polami input
- Dodano odpowiednie odstępy (margin/padding) między elementami
- Dodano link "Zapomniałeś hasła?" w formularzu logowania
- Dodano wyraźne linki przełączające między logowaniem a rejestracją
- Po zalogowaniu wyświetla się "Witaj, [username]" i przycisk wylogowania w headerze
- Po wylogowaniu użytkownik jest przekierowywany do zakładki logowania
- Wyczyść dane sesji przy wylogowaniu
- Wszystkie ikony są teraz spójnie wyrównane i mają jednakowy rozmiar

## Fix search box alignment bug and add footer
- Naprawiono błąd z paskiem wyszukiwania - usunięto niepotrzebne divy z flex items-center
- Ikona wyszukiwania używa teraz bezpośrednio pozycjonowania absolute bez dodatkowych kontenerów
- Tekst w polu wyszukiwania nie jest już pod ikoną
- Dodano panel footer na dole strony z informacjami:
  * Autorzy: Ruslan Biedychev (nr. albumu 82179), Darya Atroshchyk (nr. albumu 81829), Dzmitry Varonin (nr. albumu 81138), Tomasz Pestka
  * Uczelnia: UWSB Merito Gdańsk
  * Rok: 2026
- Footer jest responsywny i dostosowuje się do różnych rozmiarów ekranu
- Naprawiono błąd z footerem pod panelem bocznym - dodano margin-left (ml-64) do kontenera footer, aby był wyrównany z główną zawartością i nie był zasłonięty przez sidebar
