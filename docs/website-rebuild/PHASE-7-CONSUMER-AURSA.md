# PHASE 7 — CONSUMER AURSA / MIRROR MOMENT `/app` DOCUMENTATION

## 1. OBJECTIVE
Create the dedicated consumer product page for AURSA at `/app` explaining the Mirror Moment, outfit uncertainty, AURSA's private second-opinion role, personal tailoring, and download destinations while targeting the consumer `AI outfit checker` search intent without exposing internal technical machinery or modifying product/AI logic.

## 2. SEO OWNERSHIP
- **Primary Keyword Territory:** `AI outfit checker`
- **Secondary Search Territory:** `AI outfit analyzer`, `AI outfit analysis`, `outfit checker app`, `outfit feedback app`, `personal style app`, `AI stylist app`, `AI style assistant`, `outfit confidence`, `rate my outfit AI`.
- **Cannibalization Boundary:** Defers `personal style intelligence` as primary keyword category to future `/personal-style-intelligence` route.

## 3. ROUTE CREATED
- Route: `/app`
- Component: `src/pages/AppPage.jsx`
- Direct load, page refresh, BrowserRouter compatibility, prerendered.

## 4. HERO
- Eyebrow: `YOUR AI STYLE MIRROR`
- Primary H1: `Does this actually work for me?`
- Supporting copy: `AURSA gives you a private second opinion on your outfit when you're standing in front of the mirror and unsure.`
- Primary CTA: `Try AURSA` (`/mirror`)
- Secondary CTA: `Download AURSA` (`#download-aursa`)
- Supporting phrase: `Wear with Confidence.`

## 5. MIRROR MOMENT SECTION
- Eyebrow: `THE MIRROR MOMENT`
- Heading: `You're already dressed.`
- Subheading: `Something still feels uncertain.`
- Focus: Addresses the shift from browsing clothes to evaluating a chosen outfit in front of the mirror.

## 6. SECOND-OPINION SECTION
- Eyebrow: `A SECOND OPINION`
- Heading: `Understand the look before you step out.`
- Flow: `GET DRESSED` → `LOOK IN THE MIRROR` → `CHECK WITH AURSA` → `UNDERSTAND WHAT WORKS` → `STEP OUT`

## 7. PERSONAL-NOT-GENERIC SECTION
- Eyebrow: `MADE FOR YOU`
- Heading: `Because the same outfit doesn't work the same way for everyone.`
- Focus: Explains tailored visual harmony and personal context instead of trend-following rules.

## 8. PERSONAL STYLE INTELLIGENCE SECTION
- Eyebrow: `PERSONAL STYLE INTELLIGENCE`
- Heading: `Your style should become clearer over time.`
- Focus: Introduces long-term style clarity as a differentiator without cannibalizing future category page territory.

## 9. PRIVACY
- Eyebrow: `PRIVATE BY DESIGN`
- Heading: `Your outfit photo isn't stored.`
- CTA: `Read Privacy` (`/privacy`)

## 10. DOWNLOAD SECTION
- Anchor: `id="download-aursa"`
- Eyebrow: `WEAR WITH CONFIDENCE`
- Heading: `Take AURSA to your mirror.`
- Supporting copy: `Available on iPhone and Android.`

## 11. STORE DESTINATIONS
- App Store: `https://apps.apple.com/in/app/aursa/id6761254001`
- Google Play: `https://play.google.com/store/apps/details?id=com.aursa.app`

## 12. OPTIONAL PRODUCT PREVIEW
- Kept clean and typography-focused to avoid using outdated product assets.

## 13. VISUAL LANGUAGE
- Dark charcoal (#0F0F13), warm copper (#D88A3D), off-white typography, intimate dressing-space mirror atmosphere.

## 14. MOBILE BEHAVIOR
- Validated at 320px–375px; hero typography scales down cleanly, touch targets ≥44px.

## 15. TABLET BEHAVIOR
- Validated at 768px.

## 16. DESKTOP BEHAVIOR
- Validated at 1024px & 1440px.

## 17. ACCESSIBILITY
- Exactly one `<h1>`, semantic landmarks (`<section>`, `<main>`), visible focus indicators, screen-reader compatible.

## 18. REDUCED MOTION
- Integrated with Framer Motion `useReducedMotion()`.

## 19. METADATA
- Title: `AURSA — AI Outfit Checker & Personal Style App`
- Meta Description: `Use AURSA as a private AI outfit checker and personal style companion when you're standing in front of the mirror and wondering whether a look works for you.`
- Canonical: `https://aursa.app/app`
- Robots: `index, follow`

## 20. SCHEMA DECISION
- Standard `WebPage` schema with existing `Organization` and `WebSite` graph references.

## 21. SITEMAP
- Canonical URL `https://aursa.app/app` added to `scripts/prerender.js`. Total URL count updated from 11 to 12.

## 22. PRERENDER
- Prerendered HTML generated at `dist/app/index.html`.

## 23. INTERNAL LINKS
- Homepage links to `/app`. `/app` links to `/mirror`, `/privacy`, App Store, and Google Play.

## 24. HOMEPAGE PERSONAL CTA UPDATE
- Updated Hero Personal Card and Section 5 Personal Card on `src/pages/BrandGatewayHomepage.jsx` to point to `/app` with text `Explore AURSA Personal`.

## 25. ANALYTICS STATUS
- Standard link navigation maintained; custom tracking deferred.

## 26. PERFORMANCE
- Zero new heavy dependencies (no 39 MB video, no Three.js). JS bundle size increase minimal.

## 27. CLAIMS SAFETY
- All copy audited. No claims of rating attractiveness, guaranteeing better outfits, or replacing human judgment.

## 28. TECHNICAL-DETAIL AUDIT
- Zero exposure of internal algorithms, scoring dimensions, vectors, prompts, or LLM providers.

## 29. FILES CHANGED
- `src/pages/AppPage.jsx` (New)
- `src/lib/seoRegistry.js` (Updated)
- `src/App.jsx` (Updated)
- `src/pages/BrandGatewayHomepage.jsx` (Updated)
- `scripts/prerender.js` (Updated)
- `docs/website-rebuild/PHASE-7-CONSUMER-AURSA.md` (New)

## 30. BUILD RESULT
- `npm run build` executed cleanly with exit code 0.

## 31. REGRESSION RESULT
- Direct open and refresh verified for all 12 canonical routes and static blog posts.

## 32. KNOWN LIMITATIONS
- None.

## 33. DEFERRED PHASE 8 ITEMS
- `/personal-style-intelligence` category pillar page deferred to Phase 8.

## 34. PHASE 7 FREEZE VERDICT
- **FREEZE PHASE 7**
