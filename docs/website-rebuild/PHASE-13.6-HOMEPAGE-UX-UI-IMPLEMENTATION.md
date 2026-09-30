# PHASE 13.6 — RETAIL-FIRST HOMEPAGE UX/UI IMPLEMENTATION (HERO HEIGHT AMENDMENT)

## 1. OBJECTIVE
Implement the revised frozen Phase 13.6 homepage storyline locally, setting Section 1 (Hero) to a viewport-relative `min-height` (`min-h-screen min-h-[100svh] flex flex-col justify-center`) so that Section 1 occupies the user's full first browser viewport on load, with Section 2 beginning after the first screen.

---

## 2. HERO HEIGHT IMPLEMENTATION & VIEWPORT BEHAVIOR
- **Previous Height**: Fixed padding (`pt-32 sm:pt-36 pb-20 md:pb-28`) without viewport-relative min-height, causing 200–400px of Section 2 to show underneath Hero on 1440x900 / 1920x1080 screens.
- **New Height CSS**: `min-h-screen min-h-[100svh] flex flex-col justify-center pt-28 sm:pt-32 pb-12 sm:pb-16 px-6`
- **Viewport Unit Used**: `100vh` with `100svh` fallback for modern mobile address bar behavior.
- **Rationale for `min-height` over fixed height**: Using `min-height` guarantees Section 1 fills at least the entire visible viewport on normal & tall screens, while allowing Section 1 to naturally expand on short screens or when text wraps, preventing any content clipping.
- **Navbar Relationship**: Navbar sits above/inside the Hero flow with `pt-28 sm:pt-32` top padding ensuring no overlap with eyebrow or H1.
- **Section 2 Initial Visibility**: Hidden below the fold on initial page load across 1366x768, 1440x900, 1536x864, 1728x1117, and 1920x1080 viewports.

---

## 3. HERO BACKGROUND & LAYERING
- **File Name**: `hero background.png`
- **Public URL**: `/hero%20background.png`
- **Layer Structure**:
  - *Layer 0*: Background photograph (`public/hero background.png`) via `bg-cover bg-[65%_center]`.
  - *Layer 1*: Dark cinematic gradient overlay (`linear-gradient(90deg, ...)` + `linear-gradient(180deg, ...)`).
  - *Layer 2*: Hero narrative, eyebrow, H1, paragraph, CTA buttons, and compact proof strip.
  - *Layer 3*: Right-side Decision Moment / Fitting Room Session panel.

---

## 4. REVISED HOMEPAGE ARCHITECTURE (EXACTLY 7 SECTIONS)
1. **Section 1: Hero — Decision Intelligence for the Fitting Room** (Dark `#0F0F13` with `hero background.png` backdrop & full-viewport `min-h-[100svh]`):
   - Eyebrow: `AURSA FOR FASHION RETAIL`
   - H1: `Decision intelligence for the fitting room.`
   - Copy: `AURSA helps shoppers answer “Does this actually work for me?” before they buy — with a private, personalized second opinion on their own phone.`
   - Primary Discovery CTA: `See How It Works` -> `#how-aursa-helps`
   - Secondary CTA: `Request a Retail Pilot` -> `/contact?interest=retail-pilot`
   - **Hero Reassurance / Proof Strip**: `PRIVATE` (*Your outfit photo isn't stored.*), `QR-BASED` (*No new hardware required.*), `DEPLOY FAST` (*Deploy in minutes.*)
2. **Section 2: The Decision Moment** (Light Editorial `#F5F5F7`):
   - Eyebrow: `THE DECISION MOMENT`
   - H2: `The decision happens after the try-on.`
   - Progression: `TRY` → `PAUSE` → `DECIDE` with `PAUSE` visually highlighted.
3. **Section 3: How AURSA Helps** (ID `#how-aursa-helps`, Dark `#0F0F13`):
   - Eyebrow: `HOW AURSA HELPS`
   - H2: `A second opinion, right when it matters.`
   - Fast 3-Step Flow: `01 TRY THE LOOK` → `02 CHECK WITH AURSA` → `03 DECIDE`.
4. **Section 4: Retail Intelligence** (Graphite `#16161C`):
   - Eyebrow: `RETAIL INTELLIGENCE`
   - H2: `Understand more than what sold.`
   - Exactly 3 Signal Rows: `01 WHERE SHOPPERS HESITATE`, `02 WHAT STYLING QUESTIONS RECUR`, `03 WHICH RECOMMENDATIONS ATTRACT ATTENTION`.
5. **Section 5: One Mirror. Two Moments. (Image Reveal Comparison Slider)** (Warm Light `#F9F6F0`):
   - Interactive Comparison Slider with `clip-path` reveal (Default: 55% Retail / 45% Personal).
   - **Retail Moment (Left)**: `Trial room.png` (`/Trial%20room.png`, 1672x941 PNG).
   - **Personal Moment (Right)**: `mirror moment 1.png` (`/mirror%20moment%201.png`, 1672x941 PNG).
   - Comparison behavior: Drag left reveals Retail, drag right reveals Personal.
   - Mouse, touch, and keyboard accessibility via semantic range input slider.
6. **Section 6: No Smart Mirror Required** (Dark `#0F0F13`):
   - Eyebrow: `LOW-FRICTION DEPLOYMENT`
   - H2: `No smart mirror required.`
   - Flow: `FITTING ROOM` → `SCAN QR / ENTRY POINT` → `SHOPPER'S PHONE` → `AURSA DECISION`.
7. **Section 7: Final Retail CTA** (Dark `#0F0F13`):
   - Eyebrow: `GET STARTED`
   - H2: `Bring AURSA into the fitting room.`
   - Primary CTA: `Request a Retail Pilot` (`/contact?interest=retail-pilot`).

---

## 5. ORIGINAL FOOTER RESTORATION
- Restored the **exact previous pre-Phase-13.6 Footer** in `src/App.jsx`.

---

## 6. BUILD & VERIFICATION
- `npm run build` completed with **exit code 0**.
- Prerendered **22 static HTML routes**.
- Sitemap `dist/sitemap.xml` generated with **17 canonical URLs**.

---

## 7. NAVIGATION IA AMENDMENT
- **Primary Header**:
  - `Consumer App` → `/app`
  - `Insights` → `/insights`
  - `About` → `/about`
  - `Request a Pilot` → `/contact?interest=retail-pilot`
  - *Retail Removal*: `Retail` was intentionally removed from the primary top navigation because the homepage `/` is now Retail-first.
- **Footer Navigation**:
  - `Retail` → `/retail`
  - `Consumer App` → `/app`
  - `Insights` → `/insights`
  - `About` → `/about`
  - `Contact` → `/contact`
  - `Privacy Policy` → `/privacy`
- **Deep Solution Page Preservation**:
  - `/retail` remains live, indexable, canonical (`https://aursa.app/retail`), listed in `dist/sitemap.xml` (17 URLs), and internally linked through the Footer and contextual homepage buttons.

---

## 8. STATUS
- **Phase 13.6 Status**: NAVIGATION IA AMENDMENT COMPLETE — READY FOR FOUNDER VISUAL REVIEW.
- **Production Status**: DO NOT DEPLOY. Awaiting founder approval.
