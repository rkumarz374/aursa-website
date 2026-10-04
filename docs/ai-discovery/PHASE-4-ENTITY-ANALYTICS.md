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

| Channel | Current Copy / Summary | Current Category | Target Semantic Entity | Consistent? | Change Required? | Who Must Change It? |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **AURSA Website (aursa.app)** | "Instant personalized outfit second opinion before stepping out / Fitting-room decision support" | Personal Style Intelligence / Retail AI | Consumer & Retail canonical definitions fully implemented | YES | NO (Frozen Phase 2) | N/A (Code Complete) |
| **App Store (iOS)** | "AURSA: Personal Style Intelligence & Outfit Second Opinion" | Lifestyle / Utilities | B2C Canonical Entity | ALIGNED | Suggested copy refinement | **FOUNDER ACTION REQUIRED** |
| **Google Play (Android)** | "AURSA — AI Outfit Second Opinion" | Lifestyle | B2C Canonical Entity | ALIGNED | Suggested copy refinement | **FOUNDER ACTION REQUIRED** |
| **LinkedIn Company Profile** | "AI Confidence Infrastructure for Fashion Retail & Personal Style Intelligence" | Software / Retail Intelligence | B2C + B2B Canonical Entity | ALIGNED | Optional profile sync | **FOUNDER ACTION REQUIRED** |
| **External Startup Directories** | Various draft profiles | Technology / Fashion Tech | Unified Semantic Entity | PENDING AUDIT | Founder copy update | **FOUNDER ACTION REQUIRED** |

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

**Status**: 100% Consistent. All Phase 2 content strictly preserves B2C ("personalized outfit second opinion") and B2B ("fitting-room purchase decision support"). No contradictions exist.

---

## 5. APP STORE (iOS) ENTITY AUDIT

- **App Title**: AURSA — Style Intelligence
- **Subtitle**: Personal Outfit Second Opinion
- **Description Copy**: "Get an instant, private second opinion on what you're wearing before you step out. Wear with Confidence."
- **Category**: Lifestyle
- **Founder Action**: Update App Store Connect promotional text and short description with exact Phase 4 target semantic entity.
- **Status**: **FOUNDER ACTION REQUIRED**

---

## 6. GOOGLE PLAY (ANDROID) ENTITY AUDIT

- **App Title**: AURSA — Outfit Second Opinion
- **Short Description**: "Instant personalized second opinion on your outfit before stepping out."
- **Full Description**: Aligned with B2C Canonical Entity.
- **Category**: Lifestyle
- **Package Identity**: `com.aursa.app`
- **Status**: **FOUNDER ACTION REQUIRED** (Console entry updates)

---

## 7. LINKEDIN / COMPANY PROFILE AUDIT

- **Tagline**: Personal Style Intelligence & AI Confidence Infrastructure for Retail
- **About Section**: Highlighting both Consumer fitting-room decision confidence and Retail purchase hesitation reduction.
- **Status**: **FOUNDER ACTION REQUIRED** (Manual profile updates)

---

## 8. MANUAL FOUNDER CHANGES REQUIRED

```markdown
[FOUNDER ACTION REQUIRED] App Store Listing Update:
- Title: AURSA — Outfit Second Opinion
- Subtitle: Wear with Confidence
- Promotional Text: Instant personalized second opinion on what you're wearing before you step out.

[FOUNDER ACTION REQUIRED] Google Play Store Update:
- Short Description: Instant personalized outfit second opinion before you step out.
- Category: Lifestyle

[FOUNDER ACTION REQUIRED] App Store Connect Campaign Links:
- Create campaign: "AI Discovery" in App Store Connect Analytics to track iOS campaign downloads.
```

---

## 9. EXISTING ANALYTICS ARCHITECTURE AUDIT

- **Central Dispatcher**: `src/lib/analytics.js` (`trackEvent` function)
- **Integration**: Wraps PostHog (`window.posthog.capture`) and GA4 (`window.gtag('event')`).
- **Telemetry Policy**: Purely non-blocking, browser safe, zero PII, primitive property values only.
- **Page Views**: Handled via `useEffect` in `App.jsx` on React Router location change (`page_view`).
- **Scroll Tracking**: Managed by `useScrollDepth` hook.

---

## 10. EXISTING EVENT INVENTORY

| Event Name | Where Fired | GA4? | PostHog? | Web / Mobile | Parameters | Action Taken |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `page_view` | `App.jsx` | YES | YES | Web | `path`, `page_type`, `content_track`, `page_title`, `ai_source`, `content_cluster` | KEPT / ENRICHED |
| `scroll_depth_reached` | `useScrollDepth.js` | YES | YES | Web | `depth_percentage`, `path`, `page_type`, `ai_source` | KEPT / ENRICHED |
| `ai_referral_visit` | `analytics.js` | YES | YES | Web | `ai_source`, `detection_method`, `landing_path`, `referrer_host`, `content_cluster` | **NEW PHASE 4** |
| `app_store_click` | `AppDownloadSection`, `AppPage`, `BlogPostPage` | YES | YES | Web | `store` ('apple'), `source`, `platform` ('ios'), `store_platform` ('ios'), `origin_path`, `ai_source`, `content_cluster` | KEPT / ENRICHED |
| `play_store_click` | `AppDownloadSection`, `AppPage` | YES | YES | Web | `store` ('google'), `source`, `platform` ('android'), `store_platform` ('android'), `origin_path`, `ai_source`, `content_cluster` | **ENRICHED** |
| `retail_pilot_cta_click` | `RetailPilotModalContext` | YES | YES | Web | `source`, `origin_path`, `ai_source`, `content_cluster` | KEPT / ENRICHED |
| `retail_pilot_submit` | `RetailPilotModal` | YES | YES | Web | `method` ('email_client'), `channel`, `ai_source`, `content_cluster` | **ENRICHED** |
| `app_install_attributed` | Android Native Launch | YES | YES | Mobile | `platform` ('android'), `acquisition_source`, `attribution_method` | **SPECIFIED / MOBILE** |
| `first_look_check` | Android/iOS First Use | YES | YES | Mobile | `platform`, `acquisition_source` | **SPECIFIED / MOBILE** |

---

## 11. AI SOURCE TAXONOMY

Normalized internal acquisition sources:
- `chatgpt`: OpenAI ChatGPT Search / chatgpt.com
- `claude`: Anthropic Claude Search / claude.ai
- `google_ai`: Google Search AI Overviews / AI Mode (measured via Search Console)
- `bing_ai`: Microsoft Copilot / Bing AI Search
- `other_ai`: Recognized specialized AI discovery surfaces
- `unknown`: Standard web search or direct traffic

---

## 12. ATTRIBUTION DETECTION RULES

1. **ChatGPT**:
   - Primary: `utm_source=chatgpt.com` -> `ai_source = chatgpt` (`detection_method = utm`)
   - Fallback: Referrer host contains `chatgpt.com` or `chat.openai.com` -> `ai_source = chatgpt` (`detection_method = referrer`)
2. **Claude**:
   - Best-effort Referrer: Referrer host contains `claude.ai` -> `ai_source = claude` (`detection_method = referrer`)
3. **Bing AI / Copilot**:
   - Referrer host contains `copilot.microsoft.com` -> `ai_source = bing_ai` (`detection_method = referrer`)
4. **Session Persistence**:
   - Stored in `sessionStorage` (`aursa_ai_session_v1`) upon first attributable land.
   - Retained across internal SPA navigation so all downstream conversion events (`app_store_click`, `retail_pilot_submit`) inherit the acquisition origin.

---

## 13. CONFIDENCE LEVELS

| Level | Description | Applied Surfaces |
| :--- | :--- | :--- |
| **DETERMINISTIC** | Explicit campaign query parameter or native install referrer token | ChatGPT UTM (`utm_source=chatgpt.com`), Android Google Play Install Referrer |
| **BEST_EFFORT** | Browser referrer hostname string supplied during request | Claude.ai referrer header, Copilot referrer header |
| **AGGREGATE** | Platform dashboard reporting (no per-user join) | Google Search Console (Generative AI), Bing Webmaster (AI Performance), App Store Connect Campaign Analytics |
| **UNKNOWN** | Unattributed direct or un-tagged organic search | Standard browser visits without referrer metadata |

---

## 14. GA4 EVENT DICTIONARY

- `ai_referral_visit`: Triggered once per session on AI landing (`ai_source`, `detection_method`, `landing_path`, `referrer_host`, `content_cluster`).
- `app_store_click`: Triggered on iOS App Store button click (`store`, `source`, `platform`, `store_platform`, `origin_path`, `ai_source`, `content_cluster`).
- `play_store_click`: Triggered on Google Play Store button click (`store`, `source`, `platform`, `store_platform`, `origin_path`, `ai_source`, `content_cluster`).
- `retail_pilot_click`: Triggered on Request Pilot button click (`source`, `origin_path`, `ai_source`, `content_cluster`).
- `retail_pilot_submit`: Triggered on Retail Pilot contact email click (`method`, `channel`, `ai_source`, `content_cluster`).

---

## 15. POSTHOG EVENT DICTIONARY

Mirror taxonomy of GA4 dictionary with identical property structure passed through `trackEvent()`.

---

## 16. CONSUMER FUNNEL

`ai_referral_visit` (Web AI Land)  
↓  
`page_view` / `scroll_depth_reached` (Consumer Content Cluster)  
↓  
`app_store_click` / `play_store_click` (Store CTA Click)  
↓  
`app_install_attributed` (Attributable Mobile First Launch)  
↓  
`first_look_check` (Attributable First Outfit Analysis)

---

## 17. B2B RETAIL FUNNEL

`ai_referral_visit` (Web AI Land)  
↓  
`page_view` (Retail Content Cluster: `/retail`, `/retail-pilot`, Pillars)  
↓  
`retail_pilot_click` (Request Pilot Modal Trigger)  
↓  
`retail_pilot_submit` (Pilot Email Contact Action)  
↓  
`qualified_lead` (*Future / Manual CRM Qualification*)

---

## 18. ANDROID INSTALL ATTRIBUTION STATUS

- **Web Construct**: Google Play store link (`com.aursa.app`) formatted with safe acquisition referrer parameter when originating from an AI session:
  `https://play.google.com/store/apps/details?id=com.aursa.app&referrer=utm_source%3Dchatgpt.com%26utm_medium%3Dai_referral%26utm_campaign%3Daursa_ai_discovery`
- **Native Implementation**: Android project audited for Google Play Install Referrer API integration.
- **Status**: Technical web tracking complete. Native app release required for live Play Referrer parsing.

---

## 19. IOS ATTRIBUTION STATUS

- **Limitation**: Apple iOS does not support raw install-referrer parameters due to App Tracking Transparency rules.
- **Mechanism**: App Store Connect Campaign Links (`pt`/`ct` tokens) represent aggregate campaign downloads.
- **Status**: Aggregated attribution specified via App Store Connect. Per-user deterministic join excluded to maintain privacy and technical accuracy.

---

## 20. FIRST LOOK CHECK ATTRIBUTION STATUS

- **Privacy Constraint**: Zero outfit image data, analysis results, or user appearance attributes are attached to telemetry.
- **Telemetry Payload**: Includes only `platform`, `acquisition_source` (`chatgpt`, `claude`, `bing_ai`, `direct`), and `attribution_method`.

---

## 21. GOOGLE AI MEASUREMENT MODEL

- **Website Referral Policy**: Google Search traffic coming from `google.com` is NOT falsely marked as `google_ai`.
- **Visibility Model**: Google AI Overviews and Google AI Mode impressions/clicks measured via **Google Search Console -> Generative AI Performance**.

---

## 22. BING AI MEASUREMENT MODEL

- **Website Referral Policy**: Identifiable Copilot referrals (`copilot.microsoft.com`) normalized as `bing_ai`. Standard `bing.com` search retains normal search attribution.
- **Visibility Model**: Measured via **Bing Webmaster Tools -> AI Performance**.

---

## 23. CLAUDE ATTRIBUTION LIMITATIONS

- Claude web links do not consistently transmit referrer headers across all browsers.
- Detection is executed on a **best-effort basis** via `claude.ai` referrer host parsing without fabricating artificial precision.

---

## 24. PRIVACY REVIEW

- **PII Audit**: PASSED. No names, email addresses, phone numbers, or user inputs collected in event payloads.
- **Content Privacy Audit**: PASSED. Zero outfit photos, style ratings, or analysis outputs logged.
- **URL Privacy**: Referrer URL paths stripped; only domain hostname preserved (`referrer_host`).

---

## 25. BUILD & TEST RESULTS

- **Local Build (`npm run build`)**: SUCCESSFUL (Zero errors).
- **Test Suite**: Verified all route clusters, attribution detection functions, and single-firing session mechanisms locally.

---

## 26. PRODUCTION DEPLOYMENT

- **Method**: GitHub `main` branch push (`git push origin main`).
- **Live URL**: `https://aursa.app`

---

## 27. MOBILE-RELEASE REQUIREMENTS

Android Install Referrer parsing requires a native mobile build update before end-to-end install attribution is live on installed Android devices.

---

## 28. REMAINING MANUAL ACTIONS

1. Founder to update App Store Connect listing copy.
2. Founder to update Google Play Console listing copy.
3. Founder to update LinkedIn company profile tagline.
4. Founder to generate App Store Connect Campaign Links for iOS AI tracking.

---

## 29. PHASE 5 HANDOFF

Phase 4 technical implementation complete. The AI discovery attribution engine is live and operational on `https://aursa.app`.
