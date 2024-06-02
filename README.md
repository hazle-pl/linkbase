## Autorzy: Wojciech Borzęcki, Adrian Barabasz, Szymon Jakubowski
# Linkbase

---

## O Projekcie

Linkbase jest aplikacją internetową stworzoną do zbierania linków oraz informacji o filmach. Projekt wykorzystuje bazę danych MongoDB oraz posiada frontend i backend napisane w Next.js.

---

## Cel Projektu

Celem projektu "Linkbase" jest umożliwienie użytkownikom zbierania, przeglądania i zarządzania informacjami na temat różnych filmów. Główne cele projektu to:

- **Zbieranie Informacji o Filmach**: Projekt umożliwia zbieranie danych na temat różnych filmów, w tym ich tytułów, kategorii, opisów itp. Te informacje są przechowywane w bazie danych MongoDB.

- **Wyszukiwanie Filmów**: Dzięki endpointowi `search`, użytkownicy mogą wyszukiwać filmy na podstawie tytułu. To ułatwia odnalezienie konkretnych filmów w bazie danych.

- **Dodawanie Filmów**: Endpoint `add_videos` pozwala na dodawanie nowych filmów do bazy danych. Dzięki temu projekt może stale rosnąć i gromadzić nowe informacje o filmach.

- **Przeglądanie Filmów**: Użytkownicy mogą przeglądać dostępne filmy korzystając z różnych kategorii, co jest realizowane poprzez frontendowy interfejs użytkownika.

- **Zarządzanie Rekordami**: Funkcja `records` umożliwia zarządzanie rekordami z panelu administratora. Jest to przydatne narzędzie do kontroli i zarządzania danymi w bazie.

- **Stylowanie z Użyciem SCSS**: Projekt wykorzystuje SCSS do stylizacji, a podejście atomowe pozwala na modularność i łatwe zarządzanie styli.

---

## Struktura Projektu

Projekt "Linkbase" składa się z frontendu i backendu, które są napisane w Next.js. Komponenty frontendowe są używane w sposób atomowy, co ułatwia zarządzanie nimi i ich stylizację przy użyciu SCSS.

---

## Komponenty

Projekt składa się z różnych komponentów, w tym:

- Video
- SearchResults
- SearchForm
- Layout
- HeroBanner
- Header
- Footer
- Category
- List
- Category

Każdy z tych komponentów ma określone zadanie i jest używany w odpowiednich miejscach projektu.

---

## Zależności

Projekt wykorzystuje różne zależności, w tym MongoDB, Mongoose, Next.js, React i inne. Każda zależność pełni określoną rolę w funkcjonowaniu projektu.

---

## Instalacja i Uruchomienie Projektu

1. **Sklonowanie repozytorium**:
   ```bash
   git clone https://github.com/hazle-pl/linkbase.git
```

2. **Zainstalowanie paczek:**:
   ```bash
   npm install
```
1. **Uruchomienie projektu:**:
   ```bash
   npm run dev
```
Projekt będzie dostępny pod adresem http://localhost:3000.

---

## Hostowanie na Vercelu

Projekt "Linkbase" jest również hostowany na platformie Vercel. Możesz odwiedzić stronę projektu pod adresem linkbase.vercel.app.

---