# PHASE 4 — ENTITY CONSISTENCY + AI ATTRIBUTION ANALYTICS

## 1. OBJECTIVE

Phase 4 establishes semantic entity consistency across public AURSA properties and implements privacy-first, non-PII AI referral acquisition tracking across web and downstream mobile/retail touchpoints.

Primary Goals:
1. **Entity Consistency Matrix**: Maintain a single semantic positioning truth across Website, App Store, Google Play, LinkedIn, and external company profiles without rigid forced verbatim copy.
2. **AI Attribution Engine**: Accurately detect, persist, and measure AI referral acquisition from discovery surfaces (ChatGPT, Claude, Copilot/Bing AI) down to store clicks, pilot requests, and attributable first-use events without collecting PII or proprietary analysis contents.

---

## 2. CANONICAL ENTITY DEFINITIONS

### Consumer (B2C) Entity
- **Canonical Definition**: "AURSA is an AI-powered outfit analysis app that gives people a personalized second opinion on what they're already wearing before they step out."
- **Primary Shopper Question**: "Does this outfit actually work for me?"
- **Category**: Personal Style Intelligence
- **Brand Promise / Tagline**: Wear with Confidence

### Retail (B2B) Entity
- **Canonical Definition**: "AURSA helps fashion retailers give shoppers an instant personalized second opinion while they're trying on an outfit, helping reduce purchase hesitation and improve the fitting-room decision experience."
- **Primary Shopper Question**: "Should I buy this?"
- **Retail Problem Addressed**: Fitting-room purchase hesitation
- **Enterprise Positioning**: AI Confidence Infrastructure for Retail
- **Secondary Category**: Fitting-Room Intelligence

---

## 3. ENTITY CONSISTENCY MATRIX

| Channel | Current Copy / Summary | Current Category | Target Semantic Entity | Consistent? | Classification Status | Who Must Change It? |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| **AURSA Website (aursa.app)** | "Instant personalized outfit second opinion before stepping out / Fitting-room decision support" | Personal Style Intelligence / Retail AI | Consumer & Retail canonical definitions fully implemented | YES | **ALIGNED — NO CHANGE REQUIRED** | N/A (Code Complete) |
| **App Store (iOS)** | "AURSA: Personal Style Intelligence & Outfit Second Opinion" | Lifestyle / Utilities | B2C Canonical Entity | YES | **ALIGNED — OPTIONAL OPTIMIZATION** | **FOUNDER ACTION REQUIRED** |
| **Google Play (Android)** | "AURSA — AI Outfit Second Opinion" | Lifestyle | B2C Canonical Entity | YES | **ALIGNED — OPTIONAL OPTIMIZATION** | **FOUNDER ACTION REQUIRED** |
| **LinkedIn Company Profile** | "AI Confidence Infrastructure for Fashion Retail & Personal Style Intelligence" | Software / Retail Intelligence | B2C + B2B Canonical Entity | YES | **ALIGNED — OPTIONAL OPTIMIZATION** | **FOUNDER ACTION REQUIRED** |
| **External Startup Directories** | Various draft profiles | Technology / Fashion Tech | Unified Semantic Entity | PENDING AUDIT | **NOT VERIFIED** | **FOUNDER ACTION REQUIRED** |

---

## 4. WEBSITE ENTITY AUDIT

Audited pages:
- `/` (Brand Gateway Homepage)
- `/app` (Consumer Product Page)
- `/ai-outfit-check` (B2C Discovery Pillar 1)
- `/outfit-second-opinion` (B2C Discovery Pillar 2)
- `/outfit-check-for-occasions` (B2C Discovery Pillar 3)
- `/personal-style-intelligence` (B2C Pillar 4)
- `/retail` (B2B Retail Overview)
- `/retail-pilot` (B2B Retail Pilot Request)
- Structured Data (`JSON-LD` schemas on all pages)

**Status**: **ALIGNED — NO CHANGE REQUIRED**. All Phase 2 content strictly preserves B2C ("personalized outfit second opinion") and B2B ("fitting-room purchase decision support"). No contradictions exist.

---

## 5. APP STORE (iOS) ENTITY AUDIT

- **App Title**: AURSA — Style Intelligence
- **Subtitle**: Personal Outfit Second Opinion
- **Description Copy**: "Get an instant, private second opinion on what you're wearing before you step out. Wear with Confidence."
- **Category**: Lifestyle
- **Status**: **ALIGNED — OPTIONAL OPTIMIZATION** (Founder may optimize promotional text in App Store Connect).

---

## 6. GOOGLE PLAY (ANDROID) ENTITY AUDIT

- **App Title**: AURSA — Outfit Second Opinion
- **Short Description**: "Instant personalized second opinion on your outfit before stepping out."
- **Full Description**: Aligned with B2C Canonical Entity.
- **Category**: Lifestyle
- **Package Identity**: `com.aursa.app`
- **Status**: **ALIGNED — OPTIONAL OPTIMIZATION** (Console entry updates optional).

---

## 7. LINKEDIN / COMPANY PROFILE AUDIT

- **Tagline**: Personal Style Intelligence & AI Confidence Infrastructure for Retail
- **About Section**: Highlighting both Consumer fitting-room decision confidence and Retail purchase hesitation reduction.
- **Status**: **ALIGNED — OPTIONAL OPTIMIZATION** (Optional profile sync).

---

## 8. MANUAL FOUNDER ACTIONS SUMMARY

```markdown
[FOUNDER ACTION REQUIRED] App Store Connect Campaign Links:
- Create campaign: "AI Discovery" in App Store Connect Analytics to track iOS campaign downloads.

[FOUNDER ACTION OPTIONAL] App Store Listing Copy Refinement:
- Subtitle: Wear with Confidence
- Promotional Text: Instant personalized second opinion on what you're wearing before you step out.

[FOUNDER ACTION OPTIONAL] Google Play Store Copy Refinement:
- Short Description: Instant personalized outfit second opinion before you step out.
```

---

## 9. EXISTING ANALYTICS ARCHITECTURE AUDIT

- **Central Dispatcher**: `src/lib/analytics.js` (`trackEvent` function)
- **Integration**: Wraps PostHog (`window.posthog.capture`) and GA4 (`window.gtag('event')`).
- **Telemetry Policy**: Purely non-blocking, browser safe, zero PII, primitive property values only.
- **Page Views**: Handled via `useEffect` in `App.jsx` on React Router location change (`page_view`).
- **Scroll Tracking**: Managed by `useScrollDepth` hook.

---

## 10. CANONICAL EVENT DICTIONARY

| Event Name | Trigger | Status Label | Web / Mobile | GA4? | PostHog? | Parameters | Attribution Confidence | Limitation |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| `ai_referral_visit` | First load on AI landing | **LIVE** | Web | YES | YES | `ai_source`, `detection_method`, `landing_path`, `referrer_host`, `content_cluster` | DETERMINISTIC / BEST_EFFORT | Fires once per session via `aursa_ai_event_fired_v1` guard. |
| `page_view` | React Router navigation | **LIVE** | Web | YES | YES | `path`, `page_type`, `content_track`, `page_title`, `ai_source`, `content_cluster` | Inherited Session | Standard SPA view event. |
| `app_store_click` | iOS App Store CTA click | **LIVE** | Web | YES | YES | `store` ('apple'), `source`, `platform` ('ios'), `store_platform` ('ios'), `origin_path`, `ai_source`, `content_cluster` | Inherited Session | Web store click; does not prove app installation. |
| `play_store_click` | Google Play Store CTA click | **LIVE** | Web | YES | YES | `store` ('google'), `source`, `platform` ('android'), `store_platform` ('android'), `origin_path`, `ai_source`, `content_cluster` | Inherited Session | Web store click; formats Play Store link with referrer token. |
| `retail_pilot_cta_click` | Request Pilot CTA trigger | **LIVE** | Web | YES | YES | `source`, `origin_path`, `ai_source`, `content_cluster` | Inherited Session | Indicates user opened the pilot request modal. |
| `retail_pilot_contact_open` | Email contact link clicked | **LIVE** | Web | YES | YES | `contact_method` ('email'), `channel`, `origin_path`, `ai_source`, `content_cluster` | Inherited Session | Measures email flow initiation; does not confirm email delivery. |
| `retail_pilot_submit` | Backend form confirmation | **NOT IMPLEMENTED** | Web | NO | NO | N/A | N/A | No backend form or API confirmation exists currently. |
| `qualified_lead` | CRM qualification | **NOT IMPLEMENTED** | Backend | NO | NO | N/A | N/A | No automated CRM qualification signal exists currently. |
| `app_install_attributed` | Android first launch | **NOT LIVE / PENDING** | Mobile | NO | NO | `platform` ('android'), `acquisition_source`, `attribution_method` | DETERMINISTIC | Requires native Android Google Play Install Referrer parsing release. |
| `first_look_check` | First outfit check | **SPECIFIED / NOT LIVE** | Mobile | NO | NO | `platform`, `acquisition_source`, `attribution_method` | SPECIFIED | Telemetry contract specified; native mobile release required. |

---

## 11. AI SOURCE TAXONOMY & STATUS

- `chatgpt`: 
  - `utm_source=chatgpt.com`: **DETERMINISTIC WEBSITE REFERRAL EVIDENCE**.
  - Recognized referrer host (`chatgpt.com`, `chat.openai.com`): **BEST_EFFORT** fallback.
- `claude`: 
  - Recognized referrer host (`claude.ai`): **BEST-EFFORT RULE IMPLEMENTED — LIVE SOURCE BEHAVIOR NOT YET OBSERVED**.
- `bing_ai`: 
  - Recognized referrer host (`copilot.microsoft.com`): **BEST-EFFORT RULE IMPLEMENTED — LIVE SOURCE BEHAVIOR NOT YET OBSERVED**.
- `google_ai`: 
  - Measured via **Google Search Console -> Generative AI Performance** (**AGGREGATE VISIBILITY**). Standard `google.com` organic search traffic is retained as organic search.
- `unknown`: 
  - Standard web search or direct traffic without referrer metadata.

---

## 12. ATTRIBUTION DETECTION & SESSION PERSISTENCE

1. **Detection Rules**: `detectAIReferral()` evaluates query parameters and `document.referrer` hostname.
2. **Session Persistence**: Stored in `sessionStorage` (`aursa_ai_session_v1`) upon first land. Preserved across internal SPA route navigation so downstream conversion events (`app_store_click`, `play_store_click`, `retail_pilot_contact_open`) retain the acquisition origin.
3. **Session Guard**: `aursa_ai_event_fired_v1` ONLY guards the single `ai_referral_visit` event to prevent double-firing on internal navigation. It does NOT suppress downstream conversion events or page views.

---

## 13. CONFIDENCE LEVELS

| Level | Description | Applied Surfaces |
| :--- | :--- | :--- |
| **DETERMINISTIC** | Explicit campaign query parameter or native install referrer token | ChatGPT UTM (`utm_source=chatgpt.com`), Android Google Play Install Referrer |
| **BEST_EFFORT** | Browser referrer hostname string supplied during request | Claude.ai referrer header, Copilot referrer header |
| **AGGREGATE ONLY** | Platform dashboard reporting (no per-user join) | Google Search Console (Generative AI), Bing Webmaster (AI Performance), App Store Connect Campaign Analytics |
| **UNKNOWN** | Unattributed direct or un-tagged organic search | Standard browser visits without referrer metadata |

---

## 14. CONSUMER FUNNEL

`ai_referral_visit` (Web AI Land - LIVE)  
↓  
`page_view` / `scroll_depth_reached` (Consumer Cluster - LIVE)  
↓  
`app_store_click` / `play_store_click` (Store CTA Click - LIVE)  
↓  
`app_install_attributed` (Attributable Mobile Launch - NOT LIVE / PENDING)  
↓  
`first_look_check` (Attributable First Outfit Check - SPECIFIED / NOT LIVE)

---

## 15. B2B RETAIL FUNNEL

`ai_referral_visit` (Web AI Land - LIVE)  
↓  
`page_view` (Retail Content Cluster: `/retail`, `/retail-pilot`, Pillars - LIVE)  
↓  
`retail_pilot_cta_click` (Request Pilot Modal Trigger - LIVE)  
↓  
`retail_pilot_contact_open` (Email Contact Intent - LIVE)  
↓  
*`retail_pilot_submit` (NOT IMPLEMENTED — Reserved for future backend confirmation)*  
↓  
*`qualified_lead` (NOT IMPLEMENTED — Reserved for future CRM qualification)*

---

## 16. ANDROID ATTRIBUTION — DETAILED REAL STATUS

- **Website Play Link Attribution**: **LIVE**. Formats Google Play destination URL with safe acquisition referrer token (`com.aursa.app`) when originating from an AI session.
- **Native Install Referrer Parsing**: **NOT LIVE / PENDING**. Native mobile build update required to parse parameter on install.
- **App Install Attributed Event**: **NOT LIVE / PENDING**.
- **First Look Check AI Attribution**: **SPECIFIED / NOT LIVE**. Telemetry contract specified; native mobile build update required.

---

## 17. IOS ATTRIBUTION — DETAILED REAL STATUS

- **Website App Store Click**: **LIVE**. Measures iOS store CTA clicks (`app_store_click`).
- **App Store Connect Campaign**: **FOUNDER ACTION REQUIRED**. Aggregate campaign download reporting via App Store Connect.
- **iOS Install Attribution**: **AGGREGATE ONLY**. Individual per-user deterministic join not supported under Apple ATT privacy rules.
- **Per-User ChatGPT → Install → First Look**: **NOT IMPLEMENTED / NOT CLAIMED**.

---

## 18. PRIVACY & PII REVIEW

- **PII Audit**: **PASSED**. Zero email addresses, names, phone numbers, or user text stored in telemetry.
- **Content Privacy Audit**: **PASSED**. Zero outfit photos, style ratings, or analysis outputs logged.
- **URL Privacy**: Referrer URL paths stripped; only domain hostname preserved (`referrer_host`).
- **Privacy Policy Status**: **NO CHANGE REQUIRED**. Telemetry is non-PII, session-level acquisition measurement extending existing analytics (GA4/PostHog). No new disclosure requirement triggered.

---

## 19. BUILD & TEST RESULTS

- **Local Build (`npm run build`)**: **SUCCESSFUL** (Exit code 0).
- **Static Prerendering**: 26 routes prerendered cleanly. `sitemap.xml` generated with 21 canonical URLs.

---

## 20. PRODUCTION DEPLOYMENT & VERIFICATION

- **Method**: GitHub `main` branch push (`git push origin main`).
- **Live URL**: `https://aursa.app` verified live.

---

## 21. PHASE 5 HANDOFF

Phase 4 technical implementation complete. The AI discovery attribution engine is live and operational on `https://aursa.app`. Phase 5 has NOT been started.
