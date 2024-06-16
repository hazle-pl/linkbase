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

## User stories

1. **Zbieranie Informacji o Filmach**:
Jako użytkownik chcę móc dodać nowy film do bazy danych, podając jego tytuł, kategorię, opis i inne informacje, aby inni użytkownicy mogli przeglądać te dane.

2. **Wyszukiwanie Filmów**:
Jako użytkownik chcę móc wyszukać filmy na podstawie ich tytułu, aby szybko znaleźć interesujące mnie produkcje.

3. **Przeglądanie Listy Filmów w Kategoriach**:
Jako użytkownik chcę mieć możliwość przeglądania dostępnych filmów z podziałem na kategorie, takie jak horror, dramat, komedia itp., aby łatwo znaleźć filmy odpowiadające moim preferencjom.

4. **Zarządzanie Rekordami z Poziomu Panelu Administratora**:
Jako administrator chcę mieć możliwość zarządzania rekordami filmów, takimi jak edycja, usuwanie i dodawanie nowych rekordów, aby utrzymać bazę danych aktualną i uporządkowaną.

5. **Przeglądanie Podobnych Filmów**:
Jako użytkownik chcę mieć możliwość przeglądania listy podobnych filmów do aktualnie wybranego, aby odkrywać inne produkcje o podobnej tematyce, gatunku lub stylu. Ta funkcjonalność pozwala użytkownikom na poszerzenie swojego horyzontu filmowego poprzez eksplorację filmów, które są podobne do tych, które już ich zainteresowały. Dzięki temu użytkownicy mogą odkrywać nowe filmy, które mogą ich zainteresować, na podstawie ich preferencji i gustu filmowego.

6. **Dark Mode**:
Jako użytkownik chcę mieć możliwość przełączenia aplikacji na tryb ciemny (dark mode), aby zmniejszyć obciążenie oczu podczas korzystania z aplikacji w warunkach o niskim oświetleniu lub w nocy. Ta funkcjonalność umożliwia użytkownikom wygodne dostosowanie wyglądu aplikacji do swoich preferencji i potrzeb, co zwiększa komfort korzystania z niej przez dłuższy czas. Dodatkowo, tryb ciemny może pomóc w oszczędzaniu energii baterii dla urządzeń mobilnych oraz wprowadza nowoczesny i elegancki wygląd aplikacji.

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

Projekt "Linkbase" jest również hostowany na platformie Vercel. Możesz odwiedzić stronę projektu pod adresem https://linkbase.vercel.app.

---