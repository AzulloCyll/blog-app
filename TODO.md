# Lista rzeczy do poprawy

Audyt z 30 czerwca 2026. 27 punktów w 5 obszarach.
Zaktualizowano 13 lipca 2026 po naprawieniu punktów UI/kodu/SEO oraz rozwinięciu treści postów #3–6 (formularz kontaktowy pozostaje celowo mockiem).

---

## UI/UX

- [x] Brak mobile menu — nawigacja `hidden md:block` znika na telefonie, brak hamburgera (`layout.tsx:41`) — dodano `MobileNav.tsx` z hamburgerem i dropdown-nawigacją, podpięty w `layout.tsx:50`
- [x] Sidebar duplikuje nawigację — te same 3 linki 3× na stronie głównej (`page.tsx:28–74`) — usunięto cały sidebar (karta "Nawigacja" i "Szybkie menu"/`NavigationMenu`), zostaje jedna nawigacja w headerze (desktop) + `MobileNav` (mobile)
- [x] "Ustawienia" w dropdownie nic nie robi — brak `href` i `onClick` (`NavigationMenu.tsx:69–77`) — nieaktualne, `NavigationMenu.tsx` usunięty razem z sidebarem
- [x] Przycisk "Załaduj więcej" ukryty przy filtrze z >4 wynikami — `!isFiltering` blokował paginację gdy była potrzebna (`PostList.tsx`) — usunięto warunek, przycisk pokazuje się zawsze gdy `hasMore`, niezależnie od filtrowania
- [x] ThemeToggle migocze przy ładowaniu — `animate-pulse` placeholder bo `theme` inicjalizował się jako `null` (`ThemeToggle.tsx:27–31`) — `ThemeToggle` przyjmuje teraz `initialTheme` z cookie odczytanego server-side w `layout.tsx`, więc pierwszy render ma już poprawną ikonę, bez placeholdera

## Design

- [x] Ikony w `MobileNav` to inline SVG — po dodaniu `@heroicons/react` tylko ThemeToggle go używał (`MobileNav.tsx:18–24`) — zamienione na `XMarkIcon`/`Bars3Icon` z `@heroicons/react`
- [x] Avatar autora identyczny dla wszystkich — gradient `from-blue-500 to-indigo-600` niezależnie od autora — dodano `src/lib/avatar.ts` z deterministycznym gradientem na podstawie imienia autora, użyte w `BlogPost.tsx` i `posts/[id]/page.tsx`
- [x] Brak licznika wyników przy filtrowaniu — użytkownik nie wie ile łącznie pasuje — dodano tekst "Znaleziono X wyników" nad siatką postów, widoczny gdy aktywny jest search/filtr kategorii

## Treści

- [x] Posty #3, #4, #5, #6 mają szczątkową treść (~230–300 znaków) — rozwinąć do poziomu postów #2 i #7 — rozwinięte do 3000–3800 znaków w tym samym tonie, `readTime` zaktualizowany zgodnie z nową długością
- [x] Posty #3–6 bez `contentImages` — widok artykułu to sam tekst, zero ilustracji — dodano po 2 oryginalne ilustracje SVG na post (`public/images/posts/`), w stylu istniejących diagramów z postów #1/#2/#7
- [x] `about/page.tsx:20` — "Założony w 2023 roku" nie zaktualizowane po zmianie dat na 2026 — poprawione na 2026
- [ ] Formularz kontaktowy jest fake — `handleSubmit` tylko ustawia `submitted=true`, nic nie wysyła (`contact/page.tsx`) — celowo zostawione jako mock (wymaga decyzji o usłudze wysyłki maili); formularz wydzielony do `ContactForm.tsx`, żeby `contact/page.tsx` mógł mieć `metadata`
- [x] Tagi niespójne — mix polskiego/angielskiego, różne konwencje (`"ServerActions"`, `"Biznes"`, `"Intro"`) — `ServerActions` → `Server Actions`; usunięto zduplikowany tag `Biznes` (już jest kategorią) z posta #7

## Kod

- [x] Interfejs `Post` zduplikowany 3× — wyodrębnić do `src/types/post.ts` (`PostList.tsx:7`, `posts/[id]/page.tsx:12`, `BlogPost.tsx:4`) — wspólny `Post`/`ContentImage` w `src/types/post.ts`; `BlogPostProps` teraz `Pick`/`Partial` z `Post` zamiast ręcznej kopii pól
- [x] Pełna treść artykułu w bundle klienta — `content` do 3500 znaków w propsach karty, obcinany CSS (`BlogPost.tsx:79`) — `src/lib/posts.ts` (`toPostSummary`) przycina treść do `excerpt` (`src/lib/text.ts`) po stronie serwera w `page.tsx`, karty dostają tylko fragment, nie pełny artykuł
- [x] `setTimeout(..., 600)` bez powodu — dane lokalne w JSON, usunąć fałszywy loading state (`PostList.tsx:62`) — `handleLoadMore` zwiększa `visibleCount` synchronicznie, usunięto `isLoading`/spinner i test zaktualizowany
- [x] Podwójny `<main>` — `page.tsx` ma własny `<main>` wewnątrz `<main>` z `layout.tsx:57` — wewnętrzny zamieniony na `<div>`, jeden landmark `<main>` na stronę
- [x] Kategorie hardkodowane — nie pochodzą z JSON, nowa kategoria nie pojawi się w filtrze (`PostList.tsx:35`) — `CATEGORIES` wyprowadzane teraz z `Set` unikalnych `post.category` w `posts.json`
- [x] Brak `generateStaticParams` — strony postów renderują się dynamicznie mimo statycznych danych (`posts/[id]/page.tsx`) — dodano `generateStaticParams`; **uwaga:** strony nadal renderują się jako `ƒ` (dynamic) w buildzie, bo `layout.tsx` czyta `cookies()` dla motywu, co opt-outuje całe drzewo z pełnego prerenderingu — to osobny kompromis architektoniczny, nie rozwiązany tym punktem

## Optymalizacja / Wydajność

- [x] `<img>` zamiast `next/image` — brak WebP/AVIF, rozmiaru, priority hint (`BlogPost.tsx:50`, `posts/[id]/page.tsx:110,127`) — naprawione w `5fa6a96` i `73c9b65`; `unoptimized` teraz warunkowe przez `isSvgUrl()` (`src/lib/image.ts`), więc rastrowe okładki realnie przechodzą przez optymalizator
- [x] `PostList` jako `"use client"` importuje cały JSON — pełne treści wszystkich artykułów w bundle JS — `PostList` przyjmuje teraz `posts: PostSummary[]` jako props z serwerowego `page.tsx` zamiast importować `posts.json` bezpośrednio; wyszukiwanie działa po tytule/excerpt/tagach zamiast po pełnej treści
- [x] Brak `metadata` na podstronach — `about`, `contact`, `posts/[id]` mają ten sam `<title>Dziennik Dewelopera</title>` — dodano `metadata`/`generateMetadata` (tytuł z template `%s · Dziennik Dewelopera`, opis, OG/Twitter) do wszystkich trzech
- [x] Brak `loading.tsx` — nawigacja między stronami bez wskaźnika ładowania — dodano `src/app/loading.tsx` ze szkieletem siatki postów
- [x] `inter.variable` zdefiniowane ale nieużywane — `--font-inter` nigdzie niezreferowana (`layout.tsx:9`) — usunięto opcję `variable`, zostaje samo `inter.className`, którego layout faktycznie używa
- [x] Brak Open Graph meta (`og:image`) — posty mają okładki, ale nie generują podglądu przy udostępnianiu w social media — `generateMetadata` w `posts/[id]/page.tsx` ustawia `openGraph.images`/`twitter.images` na `post.imageUrl`; wymaga `NEXT_PUBLIC_SITE_URL` w `.env` (patrz `.env.example`) dla poprawnych absolutnych URLi w produkcji
- [x] Brak `robots.txt` / `sitemap.xml` — dodano `src/app/robots.ts` i `src/app/sitemap.ts` (statyczne strony + wszystkie posty)
