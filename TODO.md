# Lista rzeczy do poprawy

Audyt z 30 czerwca 2026. 27 punktów w 5 obszarach.
Zaktualizowano 11 lipca 2026 po commicie `5fa6a96`.

---

## UI/UX

- [ ] Brak mobile menu — nawigacja `hidden md:block` znika na telefonie, brak hamburgera (`layout.tsx:41`)
- [ ] Sidebar duplikuje nawigację — te same 3 linki 3× na stronie głównej (`page.tsx:28–74`)
- [ ] "Ustawienia" w dropdownie nic nie robi — brak `href` i `onClick` (`NavigationMenu.tsx:69–77`)
- [ ] Przycisk "Załaduj więcej" ukryty przy filtrze z >4 wynikami — `!isFiltering` blokuje paginację gdy jest potrzebna (`PostList.tsx`)
- [ ] ThemeToggle migocze przy ładowaniu — `animate-pulse` placeholder bo `theme` inicjalizuje się jako `null` (`ThemeToggle.tsx:27–31`) — częściowo złagodzone: motyw jest teraz czytany z cookie w `layout.tsx` po stronie serwera, więc znika miganie całej strony; sam przycisk nadal renderuje placeholder do czasu efektu klienckiego

## Design

- [ ] Ikony w sidebar i NavigationMenu to inline SVG — po dodaniu `@heroicons/react` tylko ThemeToggle go używa (`page.tsx:38–60`, `NavigationMenu.tsx:33–61`)
- [ ] Avatar autora identyczny dla wszystkich — gradient `from-blue-500 to-indigo-600` niezależnie od autora
- [x] Brak licznika wyników przy filtrowaniu — użytkownik nie wie ile łącznie pasuje — dodano tekst "Znaleziono X wyników" nad siatką postów, widoczny gdy aktywny jest search/filtr kategorii

## Treści

- [ ] Posty #3, #4, #5, #6 mają szczątkową treść (~230–300 znaków) — rozwinąć do poziomu postów #2 i #7
- [ ] Posty #3–6 bez `contentImages` — widok artykułu to sam tekst, zero ilustracji
- [x] `about/page.tsx:20` — "Założony w 2023 roku" nie zaktualizowane po zmianie dat na 2026 — poprawione na 2026
- [ ] Formularz kontaktowy jest fake — `handleSubmit` tylko ustawia `submitted=true`, nic nie wysyła (`contact/page.tsx`)
- [ ] Tagi niespójne — mix polskiego/angielskiego, różne konwencje (`"ServerActions"`, `"Biznes"`, `"Intro"`)

## Kod

- [x] Interfejs `Post` zduplikowany 3× — wyodrębnić do `src/types/post.ts` (`PostList.tsx:7`, `posts/[id]/page.tsx:12`, `BlogPost.tsx:4`) — wspólny `Post`/`ContentImage` w `src/types/post.ts`; `BlogPostProps` teraz `Pick`/`Partial` z `Post` zamiast ręcznej kopii pól
- [ ] Pełna treść artykułu w bundle klienta — `content` do 3500 znaków w propsach karty, obcinany CSS (`BlogPost.tsx:79`)
- [x] `setTimeout(..., 600)` bez powodu — dane lokalne w JSON, usunąć fałszywy loading state (`PostList.tsx:62`) — `handleLoadMore` zwiększa `visibleCount` synchronicznie, usunięto `isLoading`/spinner i test zaktualizowany
- [x] Podwójny `<main>` — `page.tsx` ma własny `<main>` wewnątrz `<main>` z `layout.tsx:57` — wewnętrzny zamieniony na `<div>`, jeden landmark `<main>` na stronę
- [x] Kategorie hardkodowane — nie pochodzą z JSON, nowa kategoria nie pojawi się w filtrze (`PostList.tsx:35`) — `CATEGORIES` wyprowadzane teraz z `Set` unikalnych `post.category` w `posts.json`
- [ ] Brak `generateStaticParams` — strony postów renderują się dynamicznie mimo statycznych danych (`posts/[id]/page.tsx`)

## Optymalizacja / Wydajność

- [x] `<img>` zamiast `next/image` — brak WebP/AVIF, rozmiaru, priority hint (`BlogPost.tsx:50`, `posts/[id]/page.tsx:110,127`) — naprawione w `5fa6a96` i `73c9b65`; `unoptimized` teraz warunkowe przez `isSvgUrl()` (`src/lib/image.ts`), więc rastrowe okładki realnie przechodzą przez optymalizator
- [ ] `PostList` jako `"use client"` importuje cały JSON — pełne treści wszystkich artykułów w bundle JS
- [ ] Brak `metadata` na podstronach — `about`, `contact`, `posts/[id]` mają ten sam `<title>Dziennik Dewelopera</title>`
- [ ] Brak `loading.tsx` — nawigacja między stronami bez wskaźnika ładowania
- [x] `inter.variable` zdefiniowane ale nieużywane — `--font-inter` nigdzie niezreferowana (`layout.tsx:9`) — usunięto opcję `variable`, zostaje samo `inter.className`, którego layout faktycznie używa
- [ ] Brak Open Graph meta (`og:image`) — posty mają okładki, ale nie generują podglądu przy udostępnianiu w social media
- [ ] Brak `robots.txt` / `sitemap.xml` — dodać `app/robots.ts` i `app/sitemap.ts`
