# Task Manager

Task Manager to aplikacja webowa umożliwiająca efektywne zarządzanie zadaniami. Umożliwia tworzenie, edytowanie, usuwanie oraz przeglądanie zadań z możliwością śledzenia postępu.

## Funkcje

- **Lista zadań**: Przeglądanie wszystkich zadań z ich postępem i znacznikami czasu.
- **Tworzenie zadań**: Dodawanie nowych zadań z tytułem, opisem i procentowym postępem.
- **Edycja zadań**: Aktualizowanie istniejących zadań.
- **Usuwanie zadań**: Usuwanie niepotrzebnych zadań.
- **Responsywny design**: Dostosowanie interfejsu do różnych rozmiarów ekranów.
- **Obsługa błędów**: Wyświetlanie przejrzystch komunikatów o błędach.

## Wykorzystane technologie

### Frontend
- **SolidJS**: Reaktywny framework do budowy interfejsów użytkownika.
- **Vite**: Szybkie narzędzie do budowy nowoczesnych aplikacji webowych.
- **SCSS**: Używane do stylizacji komponentów.
- **Axios**: Używane do wykonywania zapytań HTTP.
- **Zod**: Używane do walidacji schematów danych.

### Backend
- **Express**: Framework webowy dla Node.js.
- **Drizzle ORM**: Używane do interakcji z bazą danych.
- **SQLite**: Lekka baza danych.
- **Zod**: Używane do walidacji schematów danych.

## Instrukcje konfiguracji

### Wymagania wstępne
- Node.js (v16 lub nowszy)
- npm lub pnpm
- SQLite

### Konfiguracja Frontendu
1. Przejść do katalogu `frontend`:
   ```bash
   cd frontend
   ```
2. Zainstalować zależności:
   ```bash
   npm install
   ```
3. Uruchomić serwer deweloperski:
   ```bash
   npm run dev
   ```
4. Otworzyć aplikację w przeglądarce pod adresem `http://localhost:3000`.

### Konfiguracja Backendu
1. Przejść do katalogu `backend`:
   ```bash
   cd backend
   ```
2. Zainstalować zależności:
   ```bash
   npm install
   ```
3. Zbudować projekt:
   ```bash
   npm run build
   ```
4. Wygenerować schemat bazy danych:
   ```bash
   npm run db:generate
   ```
5. Wykonać migracje bazy danych:
   ```bash
   npm run db:migrate
   ```
6. Zasiać bazę danych (opcjonalnie):
   ```bash
   npm run db:seed
   ```
7. Uruchomić serwer:
   ```bash
   npm run start
   ```
8. Backend będzie dostępny pod adresem `http://localhost:8000`.

## Zmienne środowiskowe

### Uruchomienie
Wymagana jest zmiana nazw plików `.env.example` na `.env` w folderach `frontend` i `backend`, dostosowując konfigurację w razie potrzeby.

## Licencja
Projekt licencjonowany na podstawie licencji **UNLICENSED**.
