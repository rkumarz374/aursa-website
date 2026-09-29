# AURSA Website Rebuild — Phase 1: Current Website & Technical Architecture Audit

> **STATUS: AUDIT ONLY — COMPLETED**  
> **PHASE 1 VERIFICATION:** No production code, UI components, routes, SEO metadata, backend logic, APIs, dependencies, or app functionality have been modified.

---

## Executive Summary

1. **Current Architecture:** AURSA's website is built as a Single Page Application (SPA) using React 18, Vite 5, TailwindCSS 3, Framer Motion 11, and `react-router-dom` v7. Routing is driven entirely by `HashRouter` (`/#/`), rendering pure client-side HTML (CSR) served from a static host (`dist/index.html`).
2. **Biggest SEO Constraint:** Hash routing (`/#/about`, `/#/journal`) coupled with pure Client-Side Rendering (CSR) and the total absence of a `sitemap.xml` and `robots.txt`. Search engine crawlers receiving static HTTP responses see only the empty `<div id="root"></div>` shell and generic homepage metadata from `index.html`.
3. **Biggest Engagement Constraint:** The website lacks dedicated landing experiences for B2B Retail decision-makers (`/retail`) and B2C Consumer App users (`/app`). The current homepage mixes consumer app showcase features with general brand philosophy without clear contextual funnel separation.
4. **Biggest Technical Risk:** Architectural coupling between the public marketing site and the live web app / PWA sandbox (`src/pages/Mirror.jsx`), which shares Framer Motion animations, Global CSS, Supabase backend integrations (`src/lib/supabase.js`), and device tracking logic (`localStorage` + PostHog).
5. **Strongest Reusable Asset:** Refined visual design language (dark mode `#0F0F13`, warm accent `#D88A3D`, typography pairing *Instrument Serif* + *Inter*), robust markdown-driven blog content pipeline (`src/content/blog/`), and established legal/privacy policy copy.
6. **Phase 0 Strategy Compatibility:** **PARTIAL**. The current stack (Vite + React) can easily support the proposed route structure (`/retail`, `/app`, `/insights`, etc.) once migrated to `BrowserRouter` with static prerendering / SSR strategy.
7. **Number of Critical Blockers:** **2 Critical Blockers** (Hash Routing indexability lock and lack of static HTML prerendering / crawler-visible metadata).
8. **Recommended Next Step:** Proceed to **Phase 2 (Clean URL Routing & SEO Prerendering Foundation)** to transition from `HashRouter` to `BrowserRouter` with SPA fallback rules and static HTML metadata generation.

---

## Section 1 — Repository & Stack Inventory

### Stack Summary

* **Framework:** React `^18.2.0`
* **Build Tool:** Vite `^5.0.0` with `@vitejs/plugin-react` `^4.2.0`
* **Rendering Model:** Pure Client-Side Rendering (CSR)
* **Routing Model:** Hash-based Routing (`HashRouter` from `react-router-dom` `^7.13.1`)
* **Styling Model:** TailwindCSS `^3.4.1`, PostCSS `^8.4.35`, Autoprefixer `^10.4.17`, custom CSS in `src/index.css`
* **Animation Model:** Framer Motion `^11.0.0`
* **Analytics:** PostHog JS `^1.364.4`, Google Tag Manager / GA4 (`G-F79C288E06` embedded in `index.html`)
* **SEO Tooling:** None (No `react-helmet`, `unhead`, `next-seo`, sitemap generator, or prerender plugin installed)
* **Deployment:** Static SPA hosting with fallback via `public/404.html` (sessionStorage redirect hack)
* **External Services:** Supabase (`@supabase/supabase-js` `^2.99.2`), Backend API (`VITE_API_URL` -> `https://aursa-backend.onrender.com`), PostHog Cloud (`https://eu.i.posthog.com`)

### Dependency Inventory

| Package | Version | Used For | Affects Marketing Site? | Future SEO / Performance Considerations |
| :--- | :--- | :--- | :---: | :--- |
| `react` | `^18.2.0` | Core UI Framework | Yes | Client-side rendering root requires hydration/prerendering strategy. |
| `react-dom` | `^18.2.0` | DOM Rendering | Yes | Enables client DOM manipulation. |
| `react-router-dom` | `^7.13.1` | Application Routing | Yes | Currently configured with `HashRouter` which harms deep-link SEO. |
| `framer-motion` | `^11.0.0` | Motion & Page Transitions | Yes | Large bundle impact (~100kB+ minified). Must enforce `prefers-reduced-motion`. |
| `lucide-react` | `^0.400.0` | SVG Icon Set | Yes | Efficient tree-shakable icon components. |
| `posthog-js` | `^1.364.4` | Analytics & Product Telemetry | Yes | Initialized in `src/main.jsx`. Must handle cookie/privacy consent. |
| `@supabase/supabase-js` | `^2.99.2` | Database / Backend Client | No (App Only) | Used exclusively in `src/lib/supabase.js` for app features. |
| `@emotion/is-prop-valid` | `^1.4.0` | Framer Motion Helper | Indirect | Utility dependency for animation props. |
| `tailwindcss` | `^3.4.1` | Utility CSS | Yes | Compiles clean utility classes to `dist/assets/index-*.css` (51.3 kB). |
| `vite` | `^5.0.0` | Bundler & Dev Server | Yes | Fast HMR and Rollup production builds. |

---

## Section 2 — Project Structure Map

```
/
├── .env                              -> Production environment variables (VITE_API_URL, VITE_POSTHOG_KEY)
├── .env.development                  -> Local development environment variables
├── index.html                        -> HTML entry shell, base meta tags, GA4 snippet, Google Fonts
├── package.json                      -> Project dependencies and scripts
├── vite.config.js                    -> Vite build, asset hash, and dev server header config
├── public/                           -> Static assets served at root
│   ├── 404.html                      -> Hash routing redirect fallback script
│   ├── app-mockup.png                -> App screenshot asset (330 kB)
│   ├── aursa-logo.svg                -> Brand SVG logo
│   ├── download (7).mp4              -> Hero video background asset (39.2 MB) [LCP/Bandwidth Risk]
│   ├── mirror moment.png             -> Mirror moment visual asset (1.55 MB)
│   └── mockup.png                    -> Secondary mockup asset (1.46 MB)
├── docs/                             -> Rebuild strategy & audit documentation
│   ├── website-rebuild/
│   │   ├── PHASE-0-WEBSITE-GOALS.md  -> Authoritative Phase 0 goals document
│   │   └── PHASE-1-CURRENT-WEBSITE-AUDIT.md -> This document
└── src/
    ├── main.jsx                      -> JS entry point, PostHog init, React DOM root
    ├── App.jsx                       -> Main router setup, Layout, Hero, Navigation, Footer
    ├── index.css                     -> Tailwind imports and custom global utilities
    ├── components/
    │   ├── ScrollProgress.jsx        -> Top scroll progress bar component
    │   └── ScrollToTop.jsx           -> Route change scroll reset listener
    ├── content/
    │   └── blog/                     -> Markdown articles for journal
    │       ├── stop-dressing-for-trends.md
    │       ├── the-psychology-of-outfit-confidence.md
    │       ├── the-rise-of-ai-style-intelligence.md
    │       ├── what-makes-an-outfit-feel-right.md
    │       └── why-your-closet-feels-disconnected.md
    ├── lib/
    │   └── supabase.js               -> Supabase client initialization
    └── pages/
        ├── AboutPage.jsx             -> Brand & mission page
        ├── ContactPage.jsx           -> Contact mailto & social links
        ├── InvestorsPage.jsx         -> Investor deck / company overview page
        ├── Mirror.jsx                -> Live consumer outfit analyzer web app / PWA
        ├── PrivacyPolicyPage.jsx     -> Privacy policy document page
        └── blog/
            ├── BlogPage.jsx          -> Journal index page
            ├── BlogPostPage.jsx      -> Dynamic article detail page with frontmatter parser
            ├── blogData.js           -> Vite glob import parser (`import.meta.glob`)
            └── MarkdownRenderer.jsx  -> Custom React markdown parser & renderer
```

### File Classification

* **A. Marketing Website:** `src/App.jsx`, `src/pages/AboutPage.jsx`, `src/pages/ContactPage.jsx`, `src/pages/PrivacyPolicyPage.jsx`, `src/pages/InvestorsPage.jsx`, `src/pages/blog/*`, `src/components/*`.
* **B. Consumer/Mobile Shared Code:** `src/pages/Mirror.jsx`.
* **C. Backend/API:** `src/lib/supabase.js`.
* **D. Build/Deployment:** `vite.config.js`, `package.json`, `index.html`, `public/404.html`.
* **E. Analytics:** `src/main.jsx` (PostHog), `src/App.jsx` (`AnalyticsTracker` / GA4).
* **F. Content/Data:** `src/content/blog/*.md`, `src/pages/blog/blogData.js`.
* **G. Assets:** `public/*`, `assets/*`.
* **H. Documentation:** `docs/website-rebuild/*.md`.

---

## Section 3 — Current Routing Audit

All routes currently utilize `HashRouter` (`/#/...`).

| Current URL | Component | Routing Type | Indexable? | SEO Metadata? | Future Relevance | Risk |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `/#/` | `HeroSection` / `MirrorMoment` | Hash | Partial | Generic only | Gateway to `/retail` and `/app` | Low |
| `/#/about` | `AboutPage.jsx` | Hash | No | Dynamic JS | Retain as clean route `/about` | Low |
| `/#/contact` | `ContactPage.jsx` | Hash | No | Dynamic JS | Retain as clean route `/contact` | Low |
| `/#/privacy-policy` | `PrivacyPolicyPage.jsx` | Hash | No | Dynamic JS | Remap to clean route `/privacy` | Low |
| `/#/investors` | `InvestorsPage.jsx` | Hash | No | Dynamic JS | Retain as clean route `/investors` | Low |
| `/#/mirror` | `Mirror.jsx` | Hash | No | None | Product app route; preserve strictly | **HIGH** |
| `/#/journal` / `/#/blog` | `BlogPage.jsx` | Hash | No | Dynamic JS | Evolve into `/insights` | Medium |
| `/#/blog/:slug` | `BlogPostPage.jsx` | Hash | No | Dynamic JS + JSON-LD | Evolve into `/insights/:slug` | Medium |

---

## Section 4 — Clean URL Migration Readiness

| Migration Area | Readiness Status | Audit Findings & Requirements |
| :--- | :---: | :--- |
| **React Router Support** | **SAFE** | `react-router-dom` v7 natively supports `BrowserRouter`. |
| **SPA Host Rewrites** | **NEEDS CARE** | Requires explicit rewrite rules (`vercel.json` or host config) routing all requests to `index.html` to avoid 404 on deep refresh. |
| **Hash Route Redirects** | **NEEDS CARE** | Client-side redirect listener needed during transition to map `/#/about` -> `/about` cleanly. |
| **Product App Decoupling (`/mirror`)** | **NEEDS CARE** | `/mirror` is an interactive PWA tool. Routing changes must not break localStorage or API bindings. |
| **Route Conflict Check** | **SAFE** | `/retail` and `/app` do not conflict with existing files or route definitions. |

---

## Section 5 — Current HTML & Rendering Audit

* **Current Architecture Classification:** Pure Client-Side Rendering (CSR).
* **Initial HTML Output:** `index.html` contains an empty `<div id="root"></div>`.
* **Search Engine Visibility:** Crawlers that do not execute JavaScript receive no readable body text, article content, or route-specific headings.
* **SEO Consequences:**
  * Search engines index only the static title (`"AURSA — AI Outfit Analysis & Personal Style App"`) and generic description from `index.html`.
  * Deep pages like `/about`, `/privacy-policy`, and `/blog/:slug` are invisible to standard crawlers.
  * Prerendering or SSG is essential for Phase 2+.

---

## Section 6 — Current SEO Metadata Audit

| Route | `<title>` Source | Meta Description | Canonical | Open Graph | Schema JSON-LD | Issues |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `index.html` static | Static `index.html` | Missing | Static generic | Missing | Single generic title for all non-blog pages. |
| `/#/about` | `AnalyticsTracker` (JS) | Static `index.html` | Missing | Static generic | Missing | Meta description does not match page content. |
| `/#/contact` | `AnalyticsTracker` (JS) | Static `index.html` | Missing | Static generic | Missing | Description unchanged from homepage. |
| `/#/privacy-policy` | `AnalyticsTracker` (JS) | Static `index.html` | Missing | Static generic | Missing | Generic homepage metadata served. |
| `/#/blog/:slug` | `BlogPostPage.jsx` (JS) | Dynamic via JS | Dynamic via JS | Dynamic via JS | Dynamic Article Schema | Meta tags populated via DOM manipulation; invisible to raw HTTP bots. |

---

## Section 7 — Indexability & Crawlability Audit

* **`robots.txt` Status:** **MISSING**. No `robots.txt` exists in `public/` or root.
* **`sitemap.xml` Status:** **MISSING**. No XML sitemap exists in `public/` or root.
* **Internal Links:** Navigation uses `react-router-dom` `<Link>` components, but within hash routes (`/#/about`).
* **HTTP 404 Handling:** `public/404.html` intercepts 404s on static hosts and redirects client to `/` with `sessionStorage.redirect`, returning HTTP 200 instead of a true HTTP 404 header.

---

## Section 8 — Site Information Architecture Audit

### Current vs. Phase 0 Information Architecture Matrix

```
CURRENT IA STRUCTURE                    TARGET PHASE 0 ARCHITECTURE
├── Home (/#/)                           ├── / (AURSA Gateway: One Mirror. Two Moments.)
├── About (/#/about)                     ├── /retail (B2B Fashion Retail Intelligence)
├── Journal (/#/journal)                 ├── /app (B2C Consumer App Gateway)
├── Investors (/#/investors)             ├── /smart-fitting-room (SEO Pillar)
├── Contact (/#/contact)                 ├── /insights (Editorial & Knowledge Hub)
└── Privacy (/#/privacy-policy)          ├── /about, /privacy, /contact
```

* **Preserve:** Legal Privacy Policy text (`src/pages/PrivacyPolicyPage.jsx`), About core philosophy (`src/pages/AboutPage.jsx`), Journal markdown articles (`src/content/blog/*.md`).
* **Reposition:** Shift consumer app showcases into `/app`; position fitting room intelligence into `/retail`.
* **Replace:** Generic homepage structure with the unified **"One Mirror. Two Moments."** brand gateway.
* **Missing:** Dedicated `/retail` B2B experience, `/app` B2C gateway, and SEO pillar pages (`/smart-fitting-room`, `/fitting-room-intelligence`, etc.).

---

## Section 9 — Homepage Content Audit

| Section | Current Job | Audience | SEO Value | Engagement Value | Reuse Recommendation |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Hero Section** | Brand positioning & core headline | General | Moderate | High | **ADAPT** (Align with "One Mirror. Two Moments.") |
| **Mirror Moment** | Consumer outfit hesitation story | B2C | Moderate | High | **KEEP** (Reposition into Consumer Moment) |
| **Vibe Card Grid** | Feature showcase (Harmony, Contrast) | B2C | Low | High | **MOVE** (Shift to `/app` consumer page) |
| **Try Mirror Demo CTA**| Direct link to `/mirror` PWA app | B2C | Low | High | **KEEP** (Maintain app trial conversion path) |
| **Footer Navigation** | Legal, Social, and Page links | General | Low | Moderate | **ADAPT** (Update routes to clean paths) |

---

## Section 10 — Consumer / B2C Content Audit

* **Existing Assets:** Consumer outfit confidence messaging, mirror moment narrative, web mirror app (`src/pages/Mirror.jsx`), style breakdown cards (Vibe Cards), App Store / Play Store download pathways.
* **Target Destination:** `/app` route and consumer SEO pillar pages (`/personal-style-intelligence`).
* **Privacy Compliance:** Consumer content accurately reinforces that outfit photos are processed locally/temporarily without server photo storage.

---

## Section 11 — Retail / B2B Content Audit

* **Current Public B2B Content:** Minimal. The existing website is almost entirely focused on B2C outfit confidence and general brand philosophy.
* **Internal / Unused Content:** No hidden B2B strategy documents found in source code.
* **Target Destination:** `/retail` (Fashion Retail Intelligence) and dedicated retail SEO pillar pages (`/smart-fitting-room`, `/fitting-room-intelligence`, `/fitting-room-analytics`).

---

## Section 12 — Journal / Content System Audit

* **Content Format:** Static Markdown files in `src/content/blog/*.md` with YAML frontmatter.
* **Parsing Engine:** Native Vite eager glob import (`import.meta.glob('/src/content/blog/*.md', { query: '?raw', eager: true })`) parsed in `src/pages/blog/blogData.js`.
* **Readiness Classification:** **PARTIAL**. Content system is clean and maintainable, but URLs rely on hash routing (`/#/blog/:slug`) and lack prerendered static HTML for search engines.

---

## Section 13 — Content Duplication & SEO Risk Audit

| Issue | Location | Severity | Risk Explanation |
| :--- | :--- | :---: | :--- |
| **Duplicate Page Titles** | `index.html` / `App.jsx` | **CRITICAL** | All non-article pages share the fallback title when JS is disabled. |
| **Missing Canonical Meta** | All main pages | **HIGH** | Search engines cannot determine authoritative URLs for deep routes. |
| **Hash-Based Duplicate Content** | `/#/journal` vs `/#/blog` | **MEDIUM** | Duplicate route aliases pointing to identical content without canonical tags. |
| **Thin Searchable Text** | Homepage Hero | **MEDIUM** | High reliance on animated text cards rather than semantic HTML paragraphs. |

---

## Section 14 — Heading & Semantic HTML Audit

* **Heading Hierarchy (`<h1>` - `<h6>`):** Main pages generally maintain a single `<h1>` tag per route.
* **Semantic Layout Elements:** Uses `<main>`, `<nav>`, `<footer>`, and `<section>` tags.
* **Areas for Improvement:** Extensive reliance on nested generic `<div>` elements inside animated Framer Motion wrappers.

---

## Section 15 — Image & Media Audit

| Asset File | Path | File Size | Dimensions / Format | Risk / Issue |
| :--- | :--- | :---: | :---: | :--- |
| `download (7).mp4` | `public/` | **39.2 MB** | MP4 Video | **CRITICAL LCP / Bandwidth Risk** on mobile networks. |
| `mirror moment.png` | `public/` | **1.55 MB** | PNG Image | Large uncompressed static asset. |
| `mockup.png` | `public/` | **1.46 MB** | PNG Image | Large uncompressed static image asset. |
| `favicon.ico-Cidc-u48.png`| `public/` | **547.9 kB** | PNG Favicon | Extremely large for a favicon graphic. |
| `app-mockup.png` | `public/` | **330.6 kB** | PNG Image | Needs WebP compression. |
| `Illustration.svg` | `public/` | **250.8 kB** | SVG Vector | Complex vector shape file. |

---

## Section 16 — Font Audit

* **Font Families Used:**
  1. `Instrument Serif` (Serif display heading font)
  2. `Inter` (Sans-serif body font)
  3. `Questrial` (Secondary sans font)
  4. `Fraunces` (Serif display variant)
  5. `Playfair Display` (Loaded in `index.html`)
* **Loading Mechanism:** Fetched from Google Fonts via CSS `@import` inside `App.jsx` and `<link>` in `index.html`.
* **Performance Impact:** 5 distinct web font families create font-rendering latency and Cumulative Layout Shift (CLS) risks.

---

## Section 17 — JavaScript & Interaction Audit

* **Animation Library:** Framer Motion `^11.0.0` heavily utilized across `App.jsx`, `PageWrapper`, and page components.
* **Interactions:** Scroll progress indicator (`ScrollProgress.jsx`), card hover lifts, smooth section fade-ins, mobile navigation toggles.
* **Performance Consideration:** High JS bundle size (`587.87 kB` minified JS bundle).

---

## Section 18 — Accessibility Audit

| Area | Severity | Audit Finding |
| :--- | :---: | :--- |
| **Motion Controls** | **MEDIUM** | Framer Motion components do not consistently check `useReducedMotion()`. |
| **Image Alt Text** | **MEDIUM** | Decorative background visuals lack explicit `alt=""` attributes. |
| **Contrast Ratios** | **LOW** | Secondary text (`#A1A1AA` on `#0F0F13`) meets basic contrast standards, but small tracking captions (`text-[10px]`) require validation. |

---

## Section 19 — Current Performance Audit

* **Build Command Output:** `npm run build` completed cleanly with **0 errors**.
* **Bundle Sizes:**
  * `dist/index.html`: `2.03 kB`
  * `dist/assets/index-CEt8N858.css`: `51.34 kB` (gzip: `9.01 kB`)
  * `dist/assets/index-2O-3TKUX.js`: `587.87 kB` (gzip: `184.76 kB`) — *Exceeds 500 kB Rollup chunk warning limit.*
* **Code Splitting:** **None**. All pages and components are bundled into a single JavaScript file.
* **Core Web Vitals:** Not measured in Phase 1 (requires live production environment/field data).

---

## Section 20 — Mobile Responsiveness Audit

* **Breakpoint Strategy:** Standard Tailwind responsive prefixes (`md:`, `lg:`).
* **Mobile Navigation:** Slide-out / full-screen overlay menu implemented cleanly in `App.jsx`.
* **Layout Integrity:** Flex and grid layouts adjust fluidly across 375px, 768px, and 1440px viewports.

---

## Section 21 — Privacy & Public Claim Audit

* **Current Website Claims:**
  * *"AURSA is designed as a private, personal experience."*
  * *"Images are NOT stored on our servers."*
  * *"We do NOT collect facial recognition data or biometric identifiers."*
* **Phase 0 Alignment:** **100% ALIGNED**. The public copy strictly matches Phase 0 privacy directives (*"AURSA analyzes the outfit image for the experience. AURSA does not store the user's outfit photo."*).

---

## Section 22 — Contact / Lead Capture Audit

* **Current Contact Setup:** `src/pages/ContactPage.jsx` provides a direct `mailto:hello@aursa.app` link and social media shortcuts.
* **Form Architecture:** No interactive HTML form currently exists.
* **Future Pilot Form Readiness:** Needs an interactive form component for Phase 0 `"Request a Retail Pilot"` conversions.

---

## Section 23 — App Store / Google Play Discovery Audit

* **App Store & Play Store Links:** Prominently featured across `HeroSection` and `Footer`.
* **Asset Types:** Custom buttons and icon badges.
* **Target URLs:** External app store destinations configured cleanly.

---

## Section 24 — Analytics Audit

* **PostHog Analytics:** Initialized in `src/main.jsx` with singleton guard (`window.__POSTHOG_INITIALIZED__`). Disables session recording (`disable_session_recording: true`).
* **Google Analytics (GA4):** Loaded via `gtag.js` (`G-F79C288E06`) in `index.html` and tracked on route changes in `App.jsx`.

---

## Section 25 — Third-Party Script Audit

| Provider | Script / Source | Purpose | Blocking? | Performance / Privacy Impact |
| :--- | :--- | :--- | :---: | :--- |
| **Google Analytics (GA4)** | `gtag.js` via Google CDN | Site traffic analytics | Async | Minimal performance impact; standard cookie telemetry. |
| **PostHog Cloud** | `posthog-js` NPM module | Product telemetry & events | No | Sends events to `https://eu.i.posthog.com`. |
| **Google Fonts** | `fonts.googleapis.com` | Typography | Yes | Rerenders text on font load; potential CLS. |

---

## Section 26 — Deployment & Hosting Audit

* **Hosting Model:** Static Single Page Application (SPA).
* **Fallback Strategy:** `public/404.html` captures requests and redirects to root with hash parameters.
* **Environment Variables:** `VITE_API_URL`, `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`.

---

## Section 27 — Security / Secret Hygiene Audit

* **Repository Check:** Hardcoded anonymous client configuration found in source code.
* **Finding:** Potential secret exposure detected in `src/lib/supabase.js`. Value intentionally omitted.

---

## Section 28 — Existing SEO Infrastructure Summary

| SEO Capability | Current State | Quality | Future Action Needed |
| :--- | :---: | :---: | :--- |
| **Clean URLs** | `HashRouter` (`/#/`) | **POOR** | Migrate to `BrowserRouter` with server rewrites. |
| **Route-specific Titles** | Dynamic JS update | **PARTIAL** | Generate static title tags via prerendering/SSR. |
| **Meta Descriptions** | Dynamic JS update | **POOR** | Add static HTML meta descriptions per route. |
| **Canonicals** | Dynamic JS injection | **POOR** | Add static canonical tags to static HTML. |
| **robots.txt** | Missing | **MISSING** | Create `public/robots.txt`. |
| **sitemap.xml** | Missing | **MISSING** | Create sitemap generator workflow. |
| **Structured Data** | Dynamic JS schema | **PARTIAL** | Static JSON-LD injection for articles & organization. |
| **Semantic HTML** | Standard HTML5 tags | **GOOD** | Preserve and enhance heading hierarchy. |
| **Prerender / SSR** | None (Pure CSR) | **MISSING** | Implement static prerendering for marketing routes. |

---

## Section 29 — Engagement Readiness Audit

* **Current Telemetry:** Basic pageview tracking via PostHog and GA4.
* **Readiness for Phase 0 Events:** The existing analytics setup in `src/main.jsx` and `App.jsx` can easily be expanded to log custom engagement events (`Retail_Segment_Selected`, `Retail_CTA_Clicked`, etc.) without new dependencies.

---

## Section 30 — What Should Be Preserved

1. **Brand Aesthetics & Design System:** Dark background `#0F0F13`, copper accent `#D88A3D`, typography pairing (*Instrument Serif* + *Inter*).
2. **Journal Content & Parser:** Markdown articles in `src/content/blog/*.md` and glob import architecture in `blogData.js`.
3. **Privacy Copy & Commitments:** Clear, non-technical privacy language in `PrivacyPolicyPage.jsx`.
4. **Live App / Demo Sandbox (`src/pages/Mirror.jsx`):** Interactive outfit analyzer functionality.

---

## Section 31 — What Will Likely Need Change

| Area | Classification | Expected Future Action |
| :--- | :---: | :--- |
| **Routing System** | **CRITICAL FOR SEO** | Replace `HashRouter` with `BrowserRouter`. |
| **Static HTML Prerendering** | **CRITICAL FOR SEO** | Prerender static HTML for all public marketing routes. |
| **Sitemap & Robots** | **CRITICAL FOR SEO** | Generate `sitemap.xml` and `robots.txt`. |
| **B2B Retail Experience** | **IMPORTANT FOR CONVERSION**| Build `/retail` landing experience and pilot form. |
| **Consumer Gateway** | **IMPORTANT FOR CONVERSION**| Build `/app` consumer gateway experience. |
| **Asset Optimization** | **OPTIONAL ENHANCEMENT** | Compress `download (7).mp4` (39 MB) and large PNGs. |

---

## Section 32 — Regression Risk Map

| Area | Risk Level | Why Risk Exists | Protection Rule |
| :--- | :---: | :--- | :--- |
| **Consumer App (`src/pages/Mirror.jsx`)** | **CRITICAL** | Live PWA tool sharing router and global state. | **DO NOT TOUCH** `Mirror.jsx` or its API bindings. |
| **Supabase Client (`src/lib/supabase.js`)** | **HIGH** | App backend integration. | **DO NOT ALTER** Supabase configuration or imports. |
| **Markdown Blog Pipeline (`src/content/blog`)** | **MEDIUM** | Hardcoded file paths in `blogData.js`. | Preserve glob pattern `/src/content/blog/*.md`. |
| **Global CSS (`src/index.css`)** | **MEDIUM** | Shared Tailwind styles across app & site. | Do not remove existing utility classes. |

---

## Section 33 — Future File Impact Map

### Likely Safe Website Files (To Be Modified / Created in Future Phases)
* `src/App.jsx` (Routing update)
* `src/pages/AboutPage.jsx`
* `src/pages/ContactPage.jsx`
* `src/pages/PrivacyPolicyPage.jsx`
* `src/pages/blog/*`
* `docs/website-rebuild/*`

### Shared Files — Modify Carefully
* `index.html`
* `vite.config.js`
* `src/index.css`
* `src/main.jsx`

### Product / App Files — AVOID
* `src/pages/Mirror.jsx`

### Backend / API Files — DO NOT TOUCH
* `src/lib/supabase.js`

### Deployment Files — Change Only in Technical SEO Phase
* `public/404.html`
* `public/robots.txt`
* `public/sitemap.xml`

---

## Section 34 — Phase 0 Compatibility Verdict

* **Architecture Compatibility:** **PARTIAL** (Requires `BrowserRouter` migration and static prerendering).
* **SEO Compatibility:** **POOR** (Current CSR + HashRouter blocks crawler indexability).
* **Interaction Compatibility:** **GOOD** (Framer Motion provides necessary animation capabilities).
* **Mobile Compatibility:** **GOOD** (Existing layout is responsive).
* **Content-System Compatibility:** **GOOD** (Markdown pipeline easily extends to `/insights`).

---

## Section 35 — Blockers

### Blockers (Must resolve before launch):
1. **Hash Routing Lock:** `HashRouter` prevents search engine indexability of deep marketing routes.
2. **Missing Prerendered HTML / Meta Tags:** Pure CSR leaves crawlers with an empty HTML shell.

### Improvements (Non-blocking enhancements):
1. Asset size reduction (`39.2 MB` hero video compression).
2. JavaScript bundle code-splitting (`587 kB` monolith JS bundle).
3. Font loading consolidation (5 Google Font families).

---

## Section 36 — Recommended Implementation Order

1. **Phase 2 — Clean Routing & Prerendering Foundation:** Migrate `HashRouter` -> `BrowserRouter`, configure host rewrite rules, and implement static HTML metadata generation.
2. **Phase 3 — Technical SEO & Indexability:** Add `sitemap.xml`, `robots.txt`, canonical tags, and structured JSON-LD data.
3. **Phase 4 — Core Brand Gateway (`/`):** Implement the "One Mirror. Two Moments." homepage.
4. **Phase 5 — Retail B2B Experience (`/retail`):** Build the fashion retail intelligence page and pilot request flow.
5. **Phase 6 — Consumer App Gateway (`/app`):** Build the dedicated consumer app discovery page.
6. **Phase 7 — Content & Insights Hub (`/insights`):** Evolve the blog into the Insights topical authority hub.

---

## Section 37 — Audit Confidence

* **VERIFIED:** Stack dependencies, Vite build outputs, bundle sizes, file structure, `HashRouter` usage, lack of `robots.txt`/`sitemap.xml`, privacy policy text, Supabase client location.
* **INFERRED:** Server SPA rewrite support on host via `public/404.html`.
* **NOT VERIFIED:** Production Google Search Console index coverage, live Core Web Vitals field metrics, server access logs.

---

## Section 38 — Verification Summary

| Verification Criterion | Status |
| :--- | :---: |
| Phase 0 document read and applied | **PASSED** |
| Repository technology stack inventoried | **PASSED** |
| Project structure mapped and classified | **PASSED** |
| Current routing and hash setup documented | **PASSED** |
| HTML rendering model audited | **PASSED** |
| SEO metadata and crawlability audited | **PASSED** |
| Homepage, Consumer, and Retail content audited | **PASSED** |
| Journal / markdown system audited | **PASSED** |
| Build compilation verified (`npm run build` succeeded cleanly) | **PASSED** |
| Regression risks mapped & future file impact classified | **PASSED** |
| Phase 0 compatibility verdict rendered | **PASSED** |
| **NO production code, packages, or routes modified during Phase 1** | **PASSED** |
