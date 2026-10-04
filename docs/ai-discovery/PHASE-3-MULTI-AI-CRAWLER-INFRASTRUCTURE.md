# AURSA AI Discovery Engine
## Phase 3 — Multi-AI Crawler & Search Infrastructure Documentation

---

## 1. Objective

Phase 3 establishes the crawler governance, search indexability, and multi-AI retrieval infrastructure for AURSA's public website (`https://aursa.app`). It ensures that search engines and conversational AI discovery systems (ChatGPT Search, Claude Search, Gemini, Bing / Microsoft Copilot, Google Search AI Overviews) can crawl, index, ground, and cite AURSA's approved public content **without disclosing any confidential internal technical working, scoring algorithms, system prompts, or model architecture**.

---

## 2. Phase-2 Production Baseline

Prior to Phase 3 changes, the production environment at `https://aursa.app` was verified as healthy:
- **Homepage & Core Pages**: HTTP 200 OK
- **Phase-2 Discovery Landing Pages**: `/ai-outfit-check`, `/outfit-second-opinion`, `/outfit-check-for-occasions`, `/retail-pilot` all returning HTTP 200 OK
- **Baseline robots.txt**: Wildcard allow (`User-agent: * Allow: /`)
- **Baseline Sitemap**: `https://aursa.app/sitemap.xml` containing 21 canonical URLs

---

## 3. Crawler Policies Overview

AURSA distinguishes between **Discovery & Search Crawlers** (allowed for organic visibility) and **Independent Foundation Model Training Crawlers** (disallowed to prevent uncredited data scraping):

| Crawler / Token | Ecosystem | Purpose | Policy | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `OAI-SearchBot` | OpenAI | ChatGPT Search discovery | **ALLOW** | Enables real-time ChatGPT Search retrieval & citation. |
| `GPTBot` | OpenAI | Foundation model training | **DISALLOW** | Blocks independent data scraping for model training. |
| `ChatGPT-User` | OpenAI | User-triggered retrieval | **ALLOW (Wildcard)** | Permits on-demand user web fetch in ChatGPT. |
| `Claude-SearchBot` | Anthropic | Claude Search discovery | **ALLOW** | Enables Claude conversational search retrieval. |
| `Claude-User` | Anthropic | User-triggered retrieval | **ALLOW** | Permits direct user prompt URL fetches in Claude. |
| `ClaudeBot` | Anthropic | Anthropic model training | **DISALLOW** | Blocks independent training data scraping. |
| `Googlebot` | Google | Google Search indexing | **ALLOW** | Essential for web search inclusion & AI Overviews. |
| `Google-Extended` | Google | Gemini grounding & model features | **ALLOW** | Strategic choice to maximize Gemini & Search AI feature grounding. |
| `bingbot` | Microsoft | Bing & Copilot discovery | **ALLOW** | Essential for Bing search and Copilot discovery. |
| `User-agent: *` | General | Public web crawling | **ALLOW** | Standard web crawler access. |

---

## 4. Training-vs-Discovery Policy

- **Discovery Crawlers**: Essential for sending user traffic and references back to AURSA. Allowed across all targeted engines.
- **Training Crawlers**: Opted out (`GPTBot: Disallow`, `ClaudeBot: Disallow`) to protect AURSA's public brand positioning from being assimilated into uncredited training corpora without user referral attribution.

---

## 5. OpenAI Configuration

- `OAI-SearchBot`: `Allow: /`
- `GPTBot`: `Disallow: /`
- `ChatGPT-User`: Retained under wildcard allow (`User-agent: *`) for user-initiated links.

---

## 6. Anthropic Configuration

- `Claude-SearchBot`: `Allow: /`
- `Claude-User`: `Allow: /`
- `ClaudeBot`: `Disallow: /`

---

## 7. Googlebot Configuration

- `Googlebot`: `Allow: /` (Full search indexing access preserved).

---

## 8. Google-Extended Decision

- `Google-Extended`: `Allow: /`
- **Strategic Tradeoff**: Google-Extended controls whether Google-crawled content is available for Gemini grounding and associated model features. Because all public Phase 2 content has undergone strict confidentiality audits and contains zero technical implementation IP, allowing `Google-Extended` maximizes AURSA's organic reach across Gemini Apps and Google Search AI features.

---

## 9. Bing Configuration

- `bingbot`: `Allow: /` (Preserves Bing Search and Microsoft Copilot grounding).

---

## 10. Final `robots.txt`

```txt
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: bingbot
Allow: /

User-agent: *
Allow: /

Sitemap: https://aursa.app/sitemap.xml
```

---

## 11. Sitemap Inventory

The live sitemap (`https://aursa.app/sitemap.xml`) consists of 21 canonical URLs:

### Core & Platform (3 URLs)
- `https://aursa.app/` (Core Homepage)
- `https://aursa.app/app` (Consumer App Hub)
- `https://aursa.app/retail` (Retail B2B Hub)

### Consumer Discovery (3 URLs)
- `https://aursa.app/ai-outfit-check` (Direct Outfit Check)
- `https://aursa.app/outfit-second-opinion` (Second Opinion)
- `https://aursa.app/outfit-check-for-occasions` (Occasion Outfit Check)

### Retail Discovery (1 URL)
- `https://aursa.app/retail-pilot` (Retail Pilot Program)

### Pillar Content (5 URLs)
- `https://aursa.app/personal-style-intelligence` (Style Intelligence Pillar)
- `https://aursa.app/smart-fitting-room` (Smart Fitting Room Pillar)
- `https://aursa.app/fitting-room-intelligence` (Fitting Room Intelligence Pillar)
- `https://aursa.app/fitting-room-analytics` (Fitting Room Analytics Pillar)
- `https://aursa.app/in-store-personalization` (In-Store Personalization Pillar)

### Trust & Corporate (4 URLs)
- `https://aursa.app/about` (About AURSA)
- `https://aursa.app/contact` (Contact)
- `https://aursa.app/privacy` (Privacy Policy)
- `https://aursa.app/insights` (Insights Hub)

### Articles & Insights (5 URLs)
- `https://aursa.app/blog/stop-dressing-for-trends-start-dressing-like-yourself`
- `https://aursa.app/blog/the-psychology-of-outfit-confidence`
- `https://aursa.app/blog/the-rise-of-ai-style-intelligence`
- `https://aursa.app/blog/what-makes-an-outfit-feel-right`
- `https://aursa.app/blog/why-your-closet-feels-disconnected`

*Excluded Intentionally*: `/mirror` (Interactive mirror app) and `/investors` (Investor documentation) remain outside `sitemap.xml` with `noindex` headers intact.

---

## 12. Canonical Audit

- **Domain**: `https://aursa.app`
- **Result**: All 21 sitemap URLs feature matching self-referencing canonical tags. 0 preview, staging, or localhost canonicals exist.

---

## 13. HTTP / Indexability Audit

- All 21 sitemap URLs return **HTTP 200 OK**.
- 0 404s, 301 redirects, or 5xx server errors detected.

---

## 14. Raw HTML Audit

- Pre-rendered static HTML files generated in `dist/` contain full title, meta description, canonical, H1, direct-answer text, and structured data script blocks without depending on browser JavaScript execution.

---

## 15. CDN & Hosting Accessibility

- Verified GitHub Pages CDN serves pages without anti-bot challenges (CAPTCHA / 403 / 429) for test User-Agent headers (`OAI-SearchBot`, `Claude-SearchBot`, `Googlebot`, `bingbot`).

---

## 16. Search Console Property Status

- **Status**: **FOUNDER ACTION REQUIRED**
- The founder needs to verify property ownership for `aursa.app` in Google Search Console if not previously verified.

---

## 17. Google Search Generative AI Control Status

- **Status**: **FOUNDER ACTION REQUIRED**
- In Search Console Settings → *Search generative AI*, ensure *"Include my site's links and content in Search generative AI features"* is enabled.

---

## 18. Google Generative AI Performance

- **Status**: **FOUNDER ACTION REQUIRED** (Baseline observation in Search Console once property is active).

---

## 19. Google Sitemap / Indexing Status

- **Status**: **FOUNDER ACTION REQUIRED**
- Submit `https://aursa.app/sitemap.xml` in Search Console Sitemaps section.

---

## 20. Bing Webmaster Status & AI Performance

- **Status**: **FOUNDER ACTION REQUIRED**
- Import property from Google Search Console into Bing Webmaster Tools and verify `https://aursa.app/sitemap.xml` submission.

---

## 21. IndexNow Implementation

- **Protocol**: IndexNow standard
- **Verification Key**: `aursa942b0e71864f3c25d81e0a71f49` hosted at `https://aursa.app/aursa942b0e71864f3c25d81e0a71f49.txt`
- **Submission Script**: `scripts/indexnow.js`
- **NPM Command**: `npm run indexnow`

---

## 22. IndexNow Verification & Execution

- Submitted all 21 canonical URLs to IndexNow API endpoints (`api.indexnow.org` and `www.bing.com`).

---

## 23. Production Deployment

- Pushed via GitHub deployment pipeline (`main` branch) to production hosting (`https://aursa.app`).

---

## 24. Remaining Founder / Manual Actions

1. **Google Search Console**:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Select property `aursa.app`
   - Navigate to **Sitemaps** → Enter `sitemap.xml` → Click **Submit**
   - Navigate to **Settings** → **Search generative AI** → Ensure *"Include my site's links and content in Search generative AI features"* is selected
   - Inspect `/ai-outfit-check`, `/outfit-second-opinion`, `/outfit-check-for-occasions`, and `/retail-pilot` → Click **Request Indexing**

2. **Bing Webmaster Tools**:
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - Click **Add a site** → Select **Import from Google Search Console**
   - Confirm `https://aursa.app/sitemap.xml` is listed under Sitemaps

---

## 25. Risks

- **IndexNow Endpoint Latency**: Search engines may take 24–72 hours to reflect submitted URLs in conversational search indexes.

---

## 26. Phase 4 Handoff

Phase 3 crawler infrastructure and search engine submission setups are complete. Future phases (Analytics & Attribution, AI Referral Tracking) may now proceed upon founder directive.
