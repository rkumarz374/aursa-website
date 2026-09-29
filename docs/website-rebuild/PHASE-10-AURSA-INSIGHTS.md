# PHASE 10 — TRANSFORM JOURNAL INTO AURSA INSIGHTS

## 1. PHASE OBJECTIVE
Phase 10 transforms the generic Journal hub into **AURSA Insights** (`/insights`) — a content-system and SEO authority hub with two distinct tracks:
1. **Retail Intelligence** (fitting-room decision moment, fitting-room intelligence, fitting-room analytics, smart fitting rooms, in-store personalization).
2. **Personal Style Intelligence** (Mirror Moment, style identity, outfit confidence, recurring wardrobe choices, AI outfit-checking concepts).

AURSA Insights structures authority without mass-generating articles or creating keyword spam.

---

## 2. PREVIOUS JOURNAL ARCHITECTURE
- Legacy Hub Route: `/journal`
- Title: "The AURSA Journal — Style, Confidence & Identity"
- Generic blog layout with no distinction between B2B Retail authority and B2C Consumer authority.
- Lacked explicit track categorization for retail guides vs personal style articles.

---

## 3. NEW INSIGHTS ARCHITECTURE
- New Canonical Hub Route: `/insights`
- Title: `AURSA Insights — Retail & Personal Style Intelligence`
- Two-track content organization:
  - **Track 1: Retail Intelligence** — Surfacing the 4 authoritative Phase 8 Retail Guides (`/smart-fitting-room`, `/fitting-room-intelligence`, `/fitting-room-analytics`, `/in-store-personalization`) labeled `GUIDE`.
  - **Track 2: Personal Style Intelligence** — Surfacing the Phase 9 foundational pillar guide (`/personal-style-intelligence`) labeled `GUIDE` + the 5 published articles labeled `ARTICLE`.

---

## 4. `/journal` → `/insights` MIGRATION
- Legacy URL `https://aursa.app/journal` has been replaced by `https://aursa.app/insights` as the canonical content hub.
- `/journal` removed from `dist/sitemap.xml`.
- `/insights` added to `dist/sitemap.xml`.

---

## 5. REDIRECT IMPLEMENTATION
- **Server-side Deployment (Vercel)**: Configured 301 Permanent Redirect in `vercel.json`:
  - `source: "/journal"` → `destination: "/insights"`, `permanent: true`.
  - `source: "/journal/"` → `destination: "/insights"`, `permanent: true`.
  - `source: "/blog"` → `destination: "/insights"`, `permanent: true`.
  - `source: "/blog/"` → `destination: "/insights"`, `permanent: true`.
- **Client-side SPA Routing**: `<Route path="/journal" element={<Navigate to="/insights" replace />} />`.
- **Registry Mapping**: Listed in `ALIAS_ROUTES` in `src/lib/seoRegistry.js`.

---

## 6. ARTICLE URL PRESERVATION STRATEGY
- All existing 5 blog post URLs (`/blog/:slug`) remain **100% unchanged**:
  - `https://aursa.app/blog/stop-dressing-for-trends-start-dressing-like-yourself`
  - `https://aursa.app/blog/the-psychology-of-outfit-confidence`
  - `https://aursa.app/blog/the-rise-of-ai-style-intelligence`
  - `https://aursa.app/blog/what-makes-an-outfit-feel-right`
  - `https://aursa.app/blog/why-your-closet-feels-disconnected`
- Canonical URLs for articles remain under `/blog/:slug`. No URL churn occurred.

---

## 7. RETAIL INTELLIGENCE TRACK
- Focus: Fitting-room decisions, smart fitting rooms, fitting-room intelligence & analytics, in-store personalization.
- Features: 4 Phase 8 Guides labeled `GUIDE`.
- Secondary CTA: "Explore AURSA Retail" (`/retail`).
- Articles Count: 0 (No fake retail articles fabricated).

---

## 8. PERSONAL STYLE INTELLIGENCE TRACK
- Focus: Mirror Moment, style identity, outfit confidence, personal style, recurring choices, visual balance.
- Features: 1 Phase 9 Pillar Guide (`/personal-style-intelligence`) labeled `GUIDE` + 5 published articles labeled `ARTICLE`.

---

## 9. EXISTING ARTICLE CLASSIFICATION
- All 5 existing articles audited and classified under **Personal Style Intelligence**:
  1. *Stop Dressing for Trends. Start Dressing Like Yourself.* → Personal Style Intelligence
  2. *The Psychology of Outfit Confidence* → Personal Style Intelligence
  3. *The Rise of AI Style Intelligence* → Personal Style Intelligence
  4. *What Makes an Outfit Feel Right?* → Personal Style Intelligence
  5. *Why Your Closet Feels Disconnected* → Personal Style Intelligence

---

## 10. RETAIL GUIDE INTEGRATION
- Retail Intelligence track surfaces Phase 8 pillar guides (`/smart-fitting-room`, `/fitting-room-intelligence`, `/fitting-room-analytics`, `/in-store-personalization`) with explicit `GUIDE` badges.

---

## 11. PERSONAL PILLAR INTEGRATION
- Personal Style Intelligence track surfaces Phase 9 pillar guide (`/personal-style-intelligence`) with explicit `GUIDE` badge alongside editorial `ARTICLE` cards.

---

## 12. GUIDE VS ARTICLE CONTENT TYPES
- **GUIDE**: Evergreen pillar resources (`/smart-fitting-room`, `/fitting-room-intelligence`, `/fitting-room-analytics`, `/in-store-personalization`, `/personal-style-intelligence`). Distinct copper badge & styling.
- **ARTICLE**: Dated editorial essays (`/blog/:slug`). Distinct category & date badge.

---

## 13. INSIGHTS METADATA
- Title: `AURSA Insights — Retail & Personal Style Intelligence`
- Description: `Explore AURSA Insights: original thinking on retail decision intelligence, fitting-room decisions, personal style intelligence, outfit confidence and the Mirror Moment.`
- Robots: `index, follow`

---

## 14. CANONICAL
- Canonical URL: `https://aursa.app/insights`

---

## 15. INSIGHTS SCHEMA
- Standard WebPage schema integrated via `SEOHead` component.

---

## 16. ARTICLE SCHEMA UPDATES
- `BlogPosting` schema updated to include `articleSection`: `"Personal Style Intelligence"`.
- Preserved existing `datePublished`, `author`, `publisher`, `isPartOf`, `mainEntityOfPage`, and canonical URLs.

---

## 17. BREADCRUMB MIGRATION
- `BreadcrumbList` schema in articles updated:
  - Position 1: `AURSA` (`https://aursa.app/`)
  - Position 2: `Insights` (`https://aursa.app/insights`)
  - Position 3: Post Title (`https://aursa.app/blog/:slug`)

---

## 18. SITEMAP MIGRATION
- `/journal` removed.
- `/insights` added.
- Canonical Sitemap URL Count: Exactly **17**.

---

## 19. PRERENDER
- `dist/insights/index.html` static HTML generated.
- Raw HTML contains H1, hero copy, both tracks, 4 retail guides, 1 personal guide, 5 article titles, excerpts, metadata, canonical.

---

## 20. NAVIGATION / FOOTER UPDATE
- Header navigation: `Journal` updated to `Insights` (`/insights`).
- Mobile menu drawer: `Journal` updated to `Insights` (`/insights`).
- Article back links & footer links: Updated to `Back to AURSA Insights` (`/insights`).

---

## 21. INTERNAL LINKS
- All user-facing links to content hub point to `/insights`.

---

## 22. MOBILE BEHAVIOR
- Tested at 320–375px: Hero reads immediately, filter buttons wrap smoothly, guide and article cards stack cleanly in a single column without horizontal overflow.

---

## 23. ACCESSIBILITY
- Single H1 (`Ideas for the moments where style decisions happen.`).
- Logical H2 hierarchy for tracks (`Retail Intelligence`, `Personal Style Intelligence`).
- Interactive filter controls use `<button>` with clear aria labels and visual contrast.
- Visual distinction between `GUIDE` and `ARTICLE` uses text labels in addition to colors.

---

## 24. REDUCED MOTION
- Uses Framer Motion's `useReducedMotion` and standard CSS transitions to respect user OS preferences.

---

## 25. PERFORMANCE
- Zero new heavy dependencies added.
- Main JS bundle size: 685 kB (minified).

---

## 26. ANALYTICS STATUS
- Tracked via existing `AnalyticsTracker` with updated document titles for `/insights`.

---

## 27. CANNIBALIZATION AUDIT
- `/insights` acts as an organizing hub and does not cannibalize target keywords owned by `/smart-fitting-room`, `/retail`, `/app`, or `/personal-style-intelligence`.

---

## 28. EXISTING ARTICLE QUALITY AUDIT
- Audited all 5 existing articles. All titles, frontmatter, and links are valid. No ChatGPT placeholders or broken links found.

---

## 29. EDITORIAL PRINCIPLES
1. Problem-Led
2. AURSA Perspective
3. Human-First
4. Evidence-Aware
5. Category Discipline
6. No Keyword Variation Spam

---

## 30. FUTURE RETAIL ARTICLE IDEAS (DOCUMENTED ONLY)
- *Why the fitting room is more important than the checkout*
- *What happens between try-on and purchase?*
- *What retailers can't learn from purchase data alone*
- *Smart mirror vs shopper-phone fitting-room experiences*

---

## 31. FUTURE PERSONAL ARTICLE IDEAS (DOCUMENTED ONLY)
- *Why you change your outfit five minutes before leaving*
- *What is an AI outfit checker?*
- *Why does an outfit sometimes feel off?*
- *What is style identity?*

---

## 32. FILES CHANGED
- `src/lib/seoRegistry.js`
- `vercel.json`
- `src/pages/blog/BlogPage.jsx`
- `src/pages/blog/BlogPostPage.jsx`
- `src/App.jsx`
- `scripts/prerender.js`
- `docs/website-rebuild/PHASE-10-AURSA-INSIGHTS.md`

---

## 33. BUILD RESULT
- `npm run build` status: **PASS (Exit code 0)**.
- Sitemap count: **17 canonical URLs**.
- Prerendered routes count: 18 static HTML files.

---

## 34. REGRESSION RESULT
- Homepage (`/`), `/retail`, `/app`, 4 Phase 8 Pillars, `/personal-style-intelligence`, `/about`, `/contact`, `/privacy`, `/investors`, `/mirror` remain 100% intact and functional.

---

## 35. KNOWN LIMITATIONS
- Client-side track filtering is interactive convenience; initial SSR/prerender HTML includes full markup for both tracks for search crawlers.

---

## 36. PHASE 10 FREEZE VERDICT
- **FREEZE PHASE 10: YES**
