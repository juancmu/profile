# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint check
```

No test suite is configured.

## Architecture

Personal portfolio site for a GIS/Cadastral Engineer. React 19 + Vite SPA with React Router v7, AOS scroll animations, and Leaflet maps.

### i18n / Data Layer

All content lives in `src/i18n/lang-en.json` and `src/i18n/lang-es.json`. These files are the single source of truth for text, profile data, work experience, education, portfolio items, and freelancer projects. **To update any visible content, edit the JSON files — not the components.**

The active language and its data are exposed via `LangContext` (created in `src/App.jsx`). Components access it via the `useLang()` hook:

```js
import { useLang } from '../App'
const { lang, setLang, data } = useLang()
```

Default language on load is `'es'` (Spanish).

### Routing

| Path | Page | Purpose |
|---|---|---|
| `/` | `HomePage` | Full single-page portfolio with all sections |
| `/job/:id` | `JobPage` | Detail page for a work experience entry (id matches `work_experience[].id` in JSON) |
| `/freelancer` | `FreelancerPage` | Grid of freelancer projects from `freelancer_projects[]` in JSON |

### Pages vs Components

- **Pages** (`src/pages/`) — handle AOS init, preloader dismissal, and scroll-based navbar/back-to-top visibility. Each page repeats this setup in a `useEffect`.
- **Components** (`src/components/`) — pure presentational sections consumed by `HomePage`: `Navbar`, `Hero`, `Education`, `About`, `Experience`, `Stats`, `Portfolio`, `Contact`, `Footer`. All read from `useLang()`.

### Preloader & Scroll UX

Each page manages a `#preloader` div and a `#navbar`/`#back-to-top` scroll listener directly via DOM IDs. This pattern is intentional and consistent across pages.

### Styling

All styles are in `src/style.css` (single global stylesheet). Bootstrap Icons (`bi-*`) are used for iconography via CDN (referenced in `index.html`). CSS custom properties (`var(--color-*)`) drive the color theme.

### Static Assets

Portfolio images and public assets go in `public/assets/`. They are referenced as `/assets/filename.png` in the JSON data.
