# PHASE 11 — ENGAGEMENT SYSTEM & MEASUREMENT FRAMEWORK

## 1. PHASE OBJECTIVE
Phase 11 instruments a deliberate, privacy-first engagement system across the AURSA website. It measures real user progression through the core commercial, product, educational, and content funnels without artificially inflating time-on-site, using popups, or introducing dark patterns.

---

## 2. EXISTING ANALYTICS ARCHITECTURE
The repository uses a dual analytics setup:
- **PostHog (`posthog-js`)**: Initialized globally in `src/main.jsx` with singleton guard (`window.posthog`). Configured with `autocapture: false`, `capture_pageview: false`, and `disable_session_recording: true`.
- **Google Analytics 4 (`gtag.js`)**: Initialized via static HTML script (`G-F79C288E06`) in `index.html`.

---

## 3. PROVIDER(S) CURRENTLY IN USE
1. PostHog (`window.posthog`)
2. Google Analytics 4 (`window.gtag`)

No new analytics SDK or external tracking library was added.

---

## 4. EVENT HELPER DECISION
Created [`src/lib/analytics.js`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/src/lib/analytics.js) exporting a thin, non-blocking function `trackEvent(eventName, properties)`:
- Dispatching to both PostHog and GA4.
- Enforces primitive property types only (strings, numbers, booleans).
- Silent failure guard (`try/catch`) ensuring UI never crashes.
- Development console logging (`[Analytics Event]`).

---

## 5. EVENT NAMING CONVENTION
Uses consistent `snake_case` naming across all event families:
- `page_view`
- `scroll_depth_reached`
- `homepage_retail_selected`
- `homepage_personal_selected`
- `homepage_retail_explore_click`
- `homepage_personal_explore_click`
- `retail_trial_room_cta_click`
- `retail_trial_room_started`
- `retail_trial_room_step_viewed`
- `retail_trial_room_completed`
- `retail_view_opened`
- `retail_pilot_cta_click`
- `retail_pillar_cta_click`
- `consumer_try_aursa_click`
- `app_store_click`
- `consumer_personal_style_intelligence_click`
- `personal_style_app_click`
- `personal_style_mirror_click`
- `insights_track_selected`
- `insights_content_click`

---

## 6. PAGE-VIEW BEHAVIOR
- Handled by `AnalyticsTracker` in `src/App.jsx`.
- Maps routes to clean dimensions (`page_type`, `content_track`, `title`).
- Triggers `trackEvent('page_view', { path, page_type, content_track, page_title })`.
- Single execution per route transition; no double counting.

---

## 7. SCROLL-DEPTH IMPLEMENTATION
- Custom hook [`src/hooks/useScrollDepth.js`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/src/hooks/useScrollDepth.js).
- Fires `scroll_depth_reached` with properties `{ path, depth, page_type }`.
- Thresholds: **25%**, **50%**, **75%**, **90%**.
- Each threshold fires **ONCE** per page view.
- Fired thresholds reset automatically on SPA route transition.
- Zero-dependency implementation using `requestAnimationFrame` and passive scroll listeners.

---

## 8. HOMEPAGE EVENTS
- `homepage_retail_selected`: Fired when switching context to In Store.
- `homepage_personal_selected`: Fired when switching context to Before Stepping Out.
- `homepage_retail_explore_click`: Fired on "Explore AURSA Retail" link (`/retail`).
- `homepage_personal_explore_click`: Fired on "Explore AURSA Personal" link (`/app`).

---

## 9. RETAIL EVENTS
- `retail_trial_room_cta_click`: Hero "See How It Works" (`#trial-room-experience`).
- `retail_pilot_cta_click`: "Request a Retail Pilot" clicks (`source: 'hero' | 'trial_room' | 'final_pilot'`).

---

## 10. TRIAL ROOM EVENTS (PHASE 6 INTERACTION)
- `retail_trial_room_started`: Fired when visitor first changes step or interacts.
- `retail_trial_room_step_viewed`: Fired on step change with property `step`: `try`, `pause`, `open`, `second-opinion`, `decide`.
- `retail_trial_room_completed`: Fired when step `decide` is reached.
- `retail_view_opened`: Fired when Retail View tab is toggled.

---

## 11. RETAIL PILLAR EVENTS
- `retail_pillar_cta_click`: Fired on CTAs across `/smart-fitting-room`, `/fitting-room-intelligence`, `/fitting-room-analytics`, `/in-store-personalization`.
- Properties: `pillar`, `destination`.

---

## 12. CONSUMER EVENTS (`/app`)
- `consumer_try_aursa_click`: Fired on "Try AURSA" (`/mirror`).
- `consumer_personal_style_intelligence_click`: Fired on "Learn about Personal Style Intelligence".

---

## 13. STORE-CLICK EVENTS
- `app_store_click`: Fired on App Store and Google Play badge clicks.
- Properties: `store` (`apple` | `google`), `source` (`homepage` | `app_page` | `article`).

---

## 14. PERSONAL STYLE INTELLIGENCE EVENTS
- `personal_style_app_click`: Fired on "Explore AURSA Personal" (`/app`).
- `personal_style_mirror_click`: Fired on "Try AURSA" (`/mirror`).

---

## 15. INSIGHTS EVENTS (`/insights`)
- `insights_track_selected`: Fired on filter button click (`track: 'all' | 'retail' | 'personal'`).
- `insights_content_click`: Fired on card click (`content_type: 'guide' | 'article'`, `content_track: 'retail' | 'personal'`, `slug_or_route`).

---

## 16. ARTICLE EVENTS (`/blog/*`)
- Instrumented with scroll depth tracking (`scroll_depth_reached`).
- App store badge clicks tracked (`app_store_click`).

---

## 17. CONTACT / PILOT EVENTS
- `/contact` displays direct `mailto:hello@aursa.app` and social channels (no custom form backend).
- `retail_pilot_cta_click` measures pilot intent from `/retail` and pillars leading to `/contact?interest=retail-pilot`.
- Form completion tracking: **DEFERRED** (no backend form to submit).

---

## 18. PRIVACY RESTRICTIONS
- No PII (names, emails, phone numbers, addresses, messages) is captured.
- No image data, outfit photos, filenames, or AI score content is tracked.

---

## 19. PII RESTRICTIONS
- `trackEvent` filters properties to string, number, and boolean primitives only.

---

## 20. EVENT TAXONOMY TABLE

| Event | Trigger | Properties | Pages | Deduplication Rule | Business Question |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `page_view` | Route navigation | `path`, `page_type`, `content_track`, `page_title` | All | Once per route change | Which pages attract traffic? |
| `scroll_depth_reached` | Scroll threshold | `path`, `depth`, `page_type` | Major content pages | Once per threshold per page view | How far do users read? |
| `homepage_retail_selected` | Context button | None | `/` | On click | Do visitors explore Retail? |
| `homepage_personal_selected` | Context button | None | `/` | On click | Do visitors explore Personal? |
| `homepage_retail_explore_click` | Link click | None | `/` | On click | Does homepage lead to `/retail`? |
| `homepage_personal_explore_click` | Link click | None | `/` | On click | Does homepage lead to `/app`? |
| `retail_trial_room_cta_click` | CTA click | `source` | `/retail` | On click | Does hero lead to Trial Room? |
| `retail_trial_room_started` | Stepper interact | None | `/retail` | Once per Trial Room session | Do users start the demo? |
| `retail_trial_room_step_viewed` | Step change | `step` | `/retail` | On step change | Which demo steps are viewed? |
| `retail_trial_room_completed` | Reach step 5 | None | `/retail` | Once per session | Do users complete the demo? |
| `retail_view_opened` | Tab toggle | None | `/retail` | On click | Do retailers view B2B signals? |
| `retail_pilot_cta_click` | Pilot CTA | `source` | `/retail`, pillars | On click | Does Retail lead to pilot inquiry? |
| `retail_pillar_cta_click` | Pillar CTA | `pillar`, `destination` | Phase 8 Pillars | On click | Do SEO pillars drive commercial intent? |
| `consumer_try_aursa_click` | Try CTA | `source` | `/app` | On click | Does `/app` drive tool usage? |
| `app_store_click` | Store badge | `store`, `source` | Homepage, `/app`, article | On click | Do users click App/Play store links? |
| `consumer_personal_style_intelligence_click` | Link click | None | `/app` | On click | Does `/app` lead to category pillar? |
| `personal_style_app_click` | Link click | None | `/personal-style-intelligence` | On click | Does pillar drive product page? |
| `personal_style_mirror_click` | Link click | None | `/personal-style-intelligence` | On click | Does pillar drive mirror tool? |
| `insights_track_selected` | Filter button | `track` | `/insights` | On click | Which track do visitors focus on? |
| `insights_content_click` | Card click | `content_type`, `content_track`, `slug_or_route` | `/insights` | On click | Which guides/articles drive clicks? |

---

## 21. RETAIL FUNNEL
Pillar / Homepage → `/retail` → Trial Room Start → Trial Room Complete → Retail Pilot CTA → Contact (`?interest=retail-pilot`).

---

## 22. CONSUMER FUNNEL
Homepage / Pillar → `/app` → `/mirror` OR App Store / Google Play.

---

## 23. CONTENT FUNNEL
`/insights` → Track Filter → Guide / Article Card → Product / Pillar Page.

---

## 24. CTA AUDIT
- All CTAs verified functional across desktop, tablet, and mobile.
- No broken links or redundant CTAs found.

---

## 25. EVENT DEDUPLICATION
- `scroll_depth_reached`: Tracked via `Set` in `useRef`, cleared on pathname change.
- `retail_trial_room_started` & `completed`: Tracked via component state guards (`hasStarted`, `hasCompleted`).

---

## 26. SPA ROUTE HANDLING
- `AnalyticsTracker` observes `location.pathname` and triggers fresh `page_view` and `useScrollDepth` instances upon navigation.

---

## 27. HASH HANDLING
- Hash changes (`#trial-room-experience`, `#retail-pilot`) navigate cleanly within the page without triggering duplicate `page_view` events.

---

## 28. QUERY-PARAMETER HANDLING
- `location.pathname` is used for canonical route reporting (e.g. `/contact`). Contextual query parameters (`interest=retail-pilot`) are passed as event properties.

---

## 29. PERFORMANCE IMPACT
- Bundle increment: **+4.45 kB** minified (**+1.13 kB** gzip).
- Zero external libraries installed.

---

## 30. ANALYTICS FAILURE BEHAVIOR
- All tracking calls are wrapped in non-blocking try/catch guards. Failures log silently without interrupting navigation or rendering.

---

## 31. BUILD RESULT
- `npm run build` status: **PASS (Exit code 0)**.
- Build time: 1.43s.

---

## 32. REGRESSION RESULT
- Homepage (`/`), `/retail`, Phase 6 Trial Room, `/app`, Phase 8 Pillars, `/personal-style-intelligence`, `/insights`, `/about`, `/contact`, `/privacy`, `/investors`, `/mirror` remain 100% functional.

---

## 33. DEFERRED TRACKING
- Form completion tracking: **DEFERRED** (Contact page uses mailto/social links).

---

## 34. KNOWN LIMITATIONS
- `mailto:` link clicks measure intent to email, not backend submission receipt.

---

## 35. PHASE 11 FREEZE VERDICT
- **FREEZE PHASE 11: YES**
