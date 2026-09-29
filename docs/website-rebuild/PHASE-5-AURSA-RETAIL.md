# PHASE 5 — AURSA RETAIL `/retail` DOCUMENTATION

## 1. PHASE OBJECTIVE
Create the primary commercial landing page for AURSA Retail at `/retail` explaining the fashion retail problem AURSA addresses, focusing on the fitting/trial-room decision moment, shopper value, retailer value, no-hardware deployment, privacy-first commitment, and providing a direct request path for a retail pilot without exposing internal mechanics or introducing fake metrics.

## 2. SEO OWNERSHIP
- **Primary Keyword Territory:** `fashion retail intelligence`
- **Secondary Semantic Territory:** AI for fashion retail, fashion retail AI, retail intelligence for fashion, intelligent retail, retail customer intelligence, shopper decision intelligence, AI retail technology, retail decision intelligence, fashion retail technology.
- **Excluded/Deferred Territory:** `smart fitting room`, `fitting room analytics`, `fitting room intelligence`, `in-store personalization` (reserved for dedicated future pillar pages).

## 3. ROUTE CREATED
- Route: `/retail`
- Component: `src/pages/RetailPage.jsx`
- Navigation handling: Direct load, page refresh, BrowserRouter compatibility, fully static prerendered.

## 4. PAGE NARRATIVE & STRUCTURE
Built strictly around 8 core narrative sections + 1 reserved Phase 6 structural container:
1. **HERO:** Fashion Retail Intelligence positioning and immediate clarity.
2. **THE DECISION MOMENT:** Focusing on the trial room hesitation moment.
3. **WHERE AURSA FITS:** 5-step journey (`DISCOVER` → `RECOMMEND` → `TRY` → `DECIDE` [AURSA HERE] → `BUY`).
4. **PHASE 6 RESERVED INTEGRATION AREA:** Visual container reserved for future interactive trial room experience (`<!-- Phase 6 Interactive Trial Room will enhance this section -->`).
5. **SHOPPER VALUE:** Private second opinion at the moment of choice.
6. **RETAILER VALUE:** New decision signals beyond transaction records.
7. **NO NEW HARDWARE:** Works through shopper's existing smartphone (`FITTING ROOM` → `SHOPPER'S PHONE` → `AURSA`).
8. **PRIVACY:** Outfit photo isn't stored (`/privacy`).
9. **RETAIL PILOT CTA:** Focused pilot request path (`#retail-pilot` → `/contact?interest=retail-pilot`).

## 5. HERO
- Eyebrow: `FASHION RETAIL INTELLIGENCE`
- Primary H1: `Make the fitting-room decision more confident.`
- Supporting copy: `AURSA gives shoppers a private second opinion at the moment they're deciding whether a look actually works for them — while helping retailers better understand that decision moment.`
- Primary CTA: `Request a Retail Pilot` (`#retail-pilot`)
- Secondary CTA: `See How It Works` (`#how-it-works`)
- Deployment Line: `No smart mirror required. Works through the shopper's phone.`

## 6. DECISION MOMENT SECTION
- Eyebrow: `THE DECISION MOMENT`
- Heading: `They liked it enough to try it. Now they have to decide.`
- Focus: Explains the shift from browsing to evaluation when standing inside the trial room.

## 7. WHERE AURSA FITS
- Anchor: `id="how-it-works"`
- Heading: `AURSA starts after discovery.`
- Journey Steps: `DISCOVER` → `RECOMMEND` → `TRY` → `DECIDE` → `BUY` (visually highlighting `DECIDE`).
- No competitor names or comparison tables added.

## 8. SHOPPER VALUE
- Eyebrow: `FOR THE SHOPPER`
- Heading: `A private second opinion, right when they need it.`
- Focus: Focuses on clarity and confidence rather than pressure. Uses zero internal technical jargon (no dimension counts, no formula references).

## 9. RETAILER VALUE
- Eyebrow: `FOR THE RETAILER`
- Heading: `Understand more than what sold.`
- Framing: Carefully frames insights as potential pilot learnings (`designed to help retailers understand`, `pilot can help test`) without claiming unverified conversion or revenue metrics.

## 10. NO-HARDWARE POSITIONING
- Eyebrow: `START WITH WHAT THE SHOPPER ALREADY HAS`
- Heading: `No smart mirror required.`
- Flow: `FITTING ROOM` → `SHOPPER'S PHONE` → `AURSA`
- Avoids architecture diagrams or technical integration specs.

## 11. PRIVACY
- Eyebrow: `PRIVATE BY DESIGN`
- Heading: `The outfit photo isn't stored.`
- CTA: `Read Privacy` (`/privacy`)
- Factual and compliant with global Phase 0 privacy rules.

## 12. PILOT CTA
- Anchor: `id="retail-pilot"`
- Eyebrow: `START SMALL`
- Heading: `Explore AURSA in a real retail environment.`
- Primary CTA: `Request a Retail Pilot` (`/contact?interest=retail-pilot`)
- Destination: Safe query parameter handling on existing `/contact` route without backend modifications.

## 13. PERSONALIZATION POSITIONING
- Communicates that style analysis is personal (`The same answer shouldn't work for every shopper.`) without revealing internal profile builders, vectors, or prompts.

## 14. PHASE 6 RESERVED INTEGRATION AREA
- Structural static container included in layout between Section 3 and Section 4 with internal code comment: `<!-- Phase 6 Interactive Trial Room will enhance this section -->`. No public "Coming Soon" or fake animations implemented.

## 15. METADATA
- Registered in `src/lib/seoRegistry.js`:
  - Title: `Fashion Retail Intelligence for the Fitting-Room Decision | AURSA`
  - Description: `AURSA helps fashion retailers support shoppers at the fitting-room decision moment with a private, personalized second opinion — without requiring a smart mirror.`
  - Canonical: `https://aursa.app/retail`
  - Robots: `index, follow`

## 16. SCHEMA
- Standard WebSite / Organization schema inherited from global SEOHead system.

## 17. SITEMAP
- Canonical URL `https://aursa.app/retail` added to `scripts/prerender.js`.
- Sitemap URL count updated from 10 to 11.

## 18. INTERNAL LINKS
- `/retail` links to `/privacy` and `/contact?interest=retail-pilot`.
- Homepage links to `/retail`.

## 19. HOMEPAGE CTA UPDATE
- Updated Section 1 Hero Retail CTA and Section 5 Retail Card CTA on `src/pages/BrandGatewayHomepage.jsx` to point to `/retail` with text `Explore AURSA Retail`.

## 20. RESPONSIVE BEHAVIOR
- Validated layout on 375px (mobile), 768px (tablet), 1024px (desktop), and 1440px (large screen).
- Journey timeline displays vertically on mobile screens without horizontal scroll.

## 21. ACCESSIBILITY
- Exactly one `<h1>` per page.
- Semantic HTML tags (`<section>`, `<main>`, `<article>`, `<header>`, `<footer>`).
- Full keyboard focus styles and accessible touch target sizes (≥44px).

## 22. MOTION
- Subtle Framer Motion reveal animations. No heavy 3D, particle effects, or interactive scanning simulations.

## 23. PERFORMANCE OBSERVATIONS
- Zero new runtime dependencies added. Build completed cleanly with static page bundle sizes within expectations.

## 24. ANALYTICS STATUS
- Utilizes clean standard link navigation. No complex new custom analytics tracking required.

## 25. CLAIMS-SAFETY AUDIT
- All text verified. No claims of "increased conversion", "boosted revenue", "reduced return rates", or "guaranteed ROI".

## 26. FILES CHANGED
- `src/pages/RetailPage.jsx` (New)
- `src/lib/seoRegistry.js` (Updated)
- `src/App.jsx` (Updated)
- `src/pages/BrandGatewayHomepage.jsx` (Updated)
- `scripts/prerender.js` (Updated)
- `docs/website-rebuild/PHASE-5-AURSA-RETAIL.md` (New)

## 27. BUILD RESULT
- Executed `npm run build` cleanly with exit code 0. `dist/retail/index.html` created.

## 28. REGRESSION RESULT
- Direct open and refresh verified for `/`, `/retail`, `/about`, `/contact`, `/privacy`, `/journal`, `/blog/*`, `/investors`, `/mirror`.

## 29. KNOWN LIMITATIONS
- None.

## 30. ITEMS DEFERRED TO PHASE 6
- Interactive Trial Room simulation, QR scanning demo, Shopper/Retailer view toggles, simulated dashboards, and product recommendation previews.
