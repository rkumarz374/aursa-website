# AURSA WEBSITE REBUILD
## PHASE 4 — BRAND GATEWAY HOMEPAGE DOCUMENTATION

---

## 1. Executive Summary

Phase 4 successfully rebuilds the public homepage (`/`) into the **AURSA Brand Gateway**. The homepage communicates AURSA's unified entity identity within seconds through the core metaphor: **One mirror. Two moments.**

- **AURSA Retail (In-Store Moment)**: *"Should I buy this?"*
- **AURSA Personal (Home Mirror Moment)**: *"Should I wear this?"*
- **Shared Human Pause**: *"Does this actually work for me?"*
- **Brand Promise**: *"Wear with Confidence."*

Zero backend, AI product, authentication, or revenue systems were touched. The homepage does not compete for category keywords reserved for future dedicated pages, preventing keyword cannibalization while establishing strong brand/entity authority.

---

## 2. Narrative Architecture & 5 Core Sections

1. **HERO — THE MIRROR**
   - H1: `One mirror. Two moments.`
   - Eyebrow: `AURSA`
   - Copy: `AURSA helps you understand what works when you're standing in front of the mirror and deciding.`
   - Visual: Atmospheric glassmorphic mirror frame with subtle ambient glow and interactive Retail/Personal context toggles.
2. **THE SHARED PAUSE**
   - Eyebrow: `DIFFERENT PLACES. SAME PAUSE.`
   - Heading: `You already chose the outfit.`
   - In Store: `You liked it enough to try it.`
   - At Home: `You liked it enough to put it on.`
   - Shared Conclusion: `Now you're wondering if it actually works.`
3. **TWO DECISION JOURNEYS**
   - **AURSA RETAIL** (`#retail`): `TRY` $\rightarrow$ `PAUSE` $\rightarrow$ `SECOND OPINION` $\rightarrow$ `DECIDE`.
   - **AURSA PERSONAL** (`#personal`): `GET DRESSED` $\rightarrow$ `MIRROR MOMENT` $\rightarrow$ `SECOND OPINION` $\rightarrow$ `STEP OUT`.
4. **PRIVACY**
   - Eyebrow: `PRIVATE BY DESIGN`
   - Heading: `Your outfit photo isn't stored.`
   - Copy: `AURSA uses the image solely to understand the look and deliver real-time analysis. Your photo stays private.`
   - CTA: `Read Privacy` $\rightarrow$ `/privacy`.
5. **FINAL CHOICE**
   - Heading: `Where are you meeting AURSA?`
   - Retail Action: `Make the trial-room decision more confident.` $\rightarrow$ `Talk to AURSA` ($\rightarrow$ `/contact`).
   - Personal Action: `Know what works before you step out.` $\rightarrow$ App Store & Google Play badges.
   - Final Brand Line: `Wear with Confidence.`

---

## 3. SEO Metadata & Schema

- **Title**: `AURSA — Personal Style & Fashion Retail Intelligence`
- **Meta Description**: `AURSA helps people make more confident outfit decisions — at home through Personal Style Intelligence and in-store through Fashion Retail Intelligence.`
- **Canonical**: `https://aursa.app/`
- **Robots**: `index, follow`
- **Structured Data**: Organization + WebSite JSON-LD Graph (`https://aursa.app/#organization` & `https://aursa.app/#website`).

---

## 4. Performance & Heavy Video Status

- The legacy ~39 MB background video (`download (7).mp4`) is **NOT loaded** by the new homepage.
- The homepage visual system uses lightweight CSS gradients, Framer Motion transitions, and vector icons, resulting in instant text rendering and zero layout shifts.

---

## 5. Responsive & Motion Behavior

- **375px Mobile**: Hero H1 renders immediately; context choices stack vertically with touch targets ($\ge 44\text{px}$); scroll anchors `#retail` and `#personal` jump cleanly without horizontal overflow.
- **Reduced Motion**: Decorative transforms disable gracefully under `useReducedMotion()`, keeping all content 100% accessible.

---

## 6. Files Changed

1. [`src/pages/BrandGatewayHomepage.jsx`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/src/pages/BrandGatewayHomepage.jsx) — Created Brand Gateway Homepage component.
2. [`src/App.jsx`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/src/App.jsx) — Integrated `BrandGatewayHomepage` into route `/`.
3. [`scripts/prerender.js`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/scripts/prerender.js) — Updated static HTML prerender for route `/`.
4. [`docs/website-rebuild/PHASE-4-BRAND-GATEWAY.md`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/docs/website-rebuild/PHASE-4-BRAND-GATEWAY.md) — Documentation file.

---

## 7. Deferred Items (Phases 5 & 7)

- **Phase 5 (Retail)**: Dedicated `/retail` page, B2B pilot calculator, and interactive Trial Room demonstration.
- **Phase 7 (Consumer App)**: Dedicated `/app` page and Mirror Moment interactive experience.

---

## 8. Phase 4 Final QA & Permanent Freeze Audit Summary

- **Audit Date**: September 29, 2026
- **Narrative Validation**: **PASS** (Contains all 5 core sections: Hero/Mirror, Shared Pause, Two Decision Journeys, Privacy, Final Choice).
- **Mirror Concept Result**: **PASS** (Unified mirror metaphor with context selection for Retail vs Personal).
- **Copy Result**: **PASS** (Human-facing outcome messaging; technical analysis dimensions removed).
- **Retail Result**: **PASS** (Focuses on shopper hesitation; CTA links to `/contact`).
- **Personal Result**: **PASS** (Focuses on standing in front of the mirror and being unsure; CTAs link to App Store and Google Play Store).
- **Privacy Result**: **PASS** (`Your outfit photo isn't stored.` linking to `/privacy`).
- **Store Badges Result**: **PASS** (Both official App Store and Google Play badges displayed with verified URLs).
- **Responsiveness**: **PASS** across 375px, 768px, 1024px, 1440px.
- **Accessibility**: **PASS** (Semantic HTML, 1 H1 only, ARIA buttons, keyboard navigation, `useReducedMotion()`).
- **Prerender HTML**: **PASS** (`dist/index.html` contains full pre-rendered text for all 5 sections).
- **SEO & Schema**: **PASS** (Follows Phase 3.5 rules; Organization + WebSite graph preserved).
- **Performance**: **PASS** (39 MB hero video is NOT loaded).
- **Regression Check**: **PASS** (All 17 prerendered routes compile cleanly, sitemap contains 10 canonical URLs, 0 product/backend logic touched).
- **Freeze Verdict**: **FREEZE PHASE 4**
