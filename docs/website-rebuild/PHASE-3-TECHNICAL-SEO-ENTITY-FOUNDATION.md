# AURSA WEBSITE REBUILD
## PHASE 3 — TECHNICAL SEO & SEARCH ENTITY FOUNDATION

---

## 1. Executive Summary

Phase 3 builds the technical SEO, crawlability, canonicalization, and Schema.org search-entity foundation for AURSA without modifying visible page design, rewriting content, or introducing unproven marketing claims.

The underlying web architecture now provides:
- **Centralized SEO Route Registry** (`src/lib/seoRegistry.js`) for deterministic route indexability, title tags, descriptions, canonicals, and sitemap flags.
- **Production-Ready XML Sitemap** (`https://aursa.app/sitemap.xml`) dynamically generated at build time containing only 10 indexable, canonical HTTPS URLs.
- **Production-Safe Crawl Policy** (`public/robots.txt`) allowing standard web crawlers full access while referencing the official sitemap URL.
- **Truthful JSON-LD Schema Graphs**:
  - **Organization Schema** (`https://aursa.app/#organization`) representing AURSA with verified SVG logo (`https://aursa.app/aursa-logo.svg`) and official social profiles.
  - **WebSite Schema** (`https://aursa.app/#website`) establishing AURSA identity and referencing the publisher organization.
  - **BlogPosting Schema** and **BreadcrumbList Schema** for all published journal entries.
- **Strict Indexing Policy**:
  - **`index, follow`**: `/`, `/about`, `/contact`, `/privacy`, `/journal`, and all canonical `/blog/<slug>` pages.
  - **`noindex, follow`**: `/mirror` and `/investors`.
  - **`noindex, nofollow`**: `404` / unknown routes.
  - **`301 Redirect`**: `/privacy-policy` -> `/privacy`.

---

## 2. Documented Indexing Policy & Current Route Matrix

| Route | Index Policy | Sitemap Inclusion | Canonical URL | Open Graph Type | Primary Schema | Reason / Policy Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `index, follow` | Yes | `https://aursa.app/` | `website` | Organization + WebSite Graph | Core homepage brand entity |
| `/about` | `index, follow` | Yes | `https://aursa.app/about` | `website` | Organization Publisher Ref | Brand mission and story |
| `/contact` | `index, follow` | Yes | `https://aursa.app/contact` | `website` | None | Public communication channel |
| `/privacy` | `index, follow` | Yes | `https://aursa.app/privacy` | `website` | None | Privacy-first policy page |
| `/journal` | `index, follow` | Yes | `https://aursa.app/journal` | `website` | None | Primary journal listing root |
| `/blog` | `index, follow` | No | `https://aursa.app/journal` | `website` | None | Canonicalized to `/journal` |
| `/blog/:slug` | `index, follow` | Yes | `https://aursa.app/blog/:slug` | `article` | BlogPosting + Breadcrumbs Graph | Real journal articles (5 posts) |
| `/journal/:slug` | `index, follow` | No | `https://aursa.app/blog/:slug` | `article` | BlogPosting + Breadcrumbs Graph | Canonicalized to `/blog/:slug` |
| `/investors` | `noindex, follow` | No | `https://aursa.app/investors` | `website` | None | Legacy page; AURSA focus is retail pilots |
| `/mirror` | `noindex, follow` | No | `https://aursa.app/mirror` | `website` | None | PWA utility page, excluded from search index |
| `/privacy-policy` | 301 Redirect | No | `https://aursa.app/privacy` | N/A | None | Redirected cleanly to `/privacy` |
| `404 / Unknown` | `noindex, nofollow` | No | N/A | N/A | None | Non-existent or fallback route |

---

## 3. XML Sitemap Architecture

- **Public Sitemap URL**: `https://aursa.app/sitemap.xml`
- **Output File**: `dist/sitemap.xml`
- **Total Included URLs**: 10
- **Included URLs List**:
  1. `https://aursa.app/`
  2. `https://aursa.app/about`
  3. `https://aursa.app/contact`
  4. `https://aursa.app/privacy`
  5. `https://aursa.app/journal`
  6. `https://aursa.app/blog/stop-dressing-for-trends-start-dressing-like-yourself`
  7. `https://aursa.app/blog/the-psychology-of-outfit-confidence`
  8. `https://aursa.app/blog/the-rise-of-ai-style-intelligence`
  9. `https://aursa.app/blog/what-makes-an-outfit-feel-right`
  10. `https://aursa.app/blog/why-your-closet-feels-disconnected`

### Sitemap Rules Enforced:
1. **Canonical HTTPS URLs Only**: Every `<loc>` begins with `https://aursa.app/`.
2. **Truthful Modification Dates (`<lastmod>`)**:
   - Blog articles feature truthful `<lastmod>` extracted from frontmatter modification/published dates (`YYYY-MM-DD`).
   - Static marketing pages omit `<lastmod>` because no authoritative per-build edit timestamp exists.
3. **No Non-Indexable or Duplicate URLs**: `/mirror`, `/investors`, `/privacy-policy`, hash routes, and 404 targets are explicitly excluded.

---

## 4. Robots.txt Policy

- **Public Location**: `https://aursa.app/robots.txt`
- **Source File**: `public/robots.txt`
- **Content**:
```text
User-agent: *
Allow: /

Sitemap: https://aursa.app/sitemap.xml
```
- **Policy Notes**: Crawlers are allowed access across the domain so page-level indexing directives (`<meta name="robots" content="noindex, follow">` on `/mirror` and `/investors`) can be fetched and respected by search engines.

---

## 5. Entity Architecture & Structured Data

Structured data is serialized in JSON-LD and embedded into page `<head>` during prerendering and client-side navigation.

### 5.1 Organization Schema (`https://aursa.app/#organization`)
Implemented on homepage and referenced across publisher/author graph fields:
```json
{
  "@type": "Organization",
  "@id": "https://aursa.app/#organization",
  "name": "AURSA",
  "url": "https://aursa.app/",
  "logo": "https://aursa.app/aursa-logo.svg",
  "sameAs": [
    "https://www.instagram.com/aursa.ai/",
    "https://www.linkedin.com/company/aursa",
    "https://x.com/AursaAI"
  ]
}
```

### 5.2 WebSite Schema (`https://aursa.app/#website`)
Implemented on homepage to establish domain identity:
```json
{
  "@type": "WebSite",
  "@id": "https://aursa.app/#website",
  "url": "https://aursa.app/",
  "name": "AURSA",
  "publisher": {
    "@id": "https://aursa.app/#organization"
  }
}
```

### 5.3 BlogPosting & BreadcrumbList Graph
Implemented on all real journal posts (`/blog/:slug`):
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aursa.app/#organization",
      "name": "AURSA",
      "url": "https://aursa.app/",
      "logo": "https://aursa.app/aursa-logo.svg",
      "sameAs": [
        "https://www.instagram.com/aursa.ai/",
        "https://www.linkedin.com/company/aursa",
        "https://x.com/AursaAI"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://aursa.app/#website",
      "url": "https://aursa.app/",
      "name": "AURSA",
      "publisher": {
        "@id": "https://aursa.app/#organization"
      }
    },
    {
      "@type": "BlogPosting",
      "@id": "https://aursa.app/blog/what-makes-an-outfit-feel-right#article",
      "url": "https://aursa.app/blog/what-makes-an-outfit-feel-right",
      "headline": "What Makes an Outfit Feel “Right”",
      "description": "Demystify visual balance in personal style. Explore how contrast ratios, focal points, and shape composition trigger subconscious harmony.",
      "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      "datePublished": "2026-05-13T18:30:00.000Z",
      "author": {
        "@type": "Organization",
        "@id": "https://aursa.app/#organization",
        "name": "AURSA"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://aursa.app/#organization",
        "name": "AURSA"
      },
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://aursa.app/#website"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://aursa.app/blog/what-makes-an-outfit-feel-right"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://aursa.app/blog/what-makes-an-outfit-feel-right#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "AURSA",
          "item": "https://aursa.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Journal",
          "item": "https://aursa.app/journal"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "What Makes an Outfit Feel “Right”",
          "item": "https://aursa.app/blog/what-makes-an-outfit-feel-right"
        }
      ]
    }
  ]
}
```

---

## 6. Social Open Graph & Twitter Cards

- **Global OG Image Fallback**: `https://aursa.app/aursa-logo.svg`
- **Article OG Images**: Explicitly pulled from article frontmatter (`coverImage` / `ogImage`).
- **Twitter Card Type**: `summary_large_image` across all indexable routes.
- **HTML Language Attribute**: `<html lang="en">` verified on root template.

---

## 7. Search Console & Bing Webmaster Readiness

- **Google Search Console Submission URL**: `https://aursa.app/sitemap.xml`
- **Bing Webmaster Tools Submission URL**: `https://aursa.app/sitemap.xml`
- **IndexNow Integration Strategy**: Documented for Phase 4 deployment workflow when new articles or retail pages are dynamically published. Native Node fetch endpoint trigger can post updated canonical URLs using a secured IndexNow API key hosted at root (`https://aursa.app/<key>.txt`).

---

## 8. Build & Verification Results

- **Vite Build**: Exit code 0 (1,895 modules transformed).
- **Prerender Output**: 17 static HTML files generated inside `dist/`.
- **Sitemap Generation**: `dist/sitemap.xml` successfully generated with 10 canonical URLs.
- **JSON-LD Validation**: Local JSON parsing confirmed valid syntax and correct graph link references across all 5 articles.

---

## 9. Files Changed

1. [`src/lib/seoRegistry.js`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/src/lib/seoRegistry.js) — Centralized SEO metadata and route indexability registry.
2. [`src/components/SEOHead.jsx`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/src/components/SEOHead.jsx) — Added `HOMEPAGE_SCHEMA` export, logo asset URL update to `aursa-logo.svg`, and dynamic `<head>` management.
3. [`src/App.jsx`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/src/App.jsx) — Attached homepage schema graph to `/` and set `robots="noindex, nofollow"` on 404 page.
4. [`src/pages/blog/BlogPostPage.jsx`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/src/pages/blog/BlogPostPage.jsx) — Integrated `BlogPosting` + `BreadcrumbList` graph schema for journal posts, omitted `dateModified` when no explicit `updatedAt` field exists, and updated Organization logo URL.
5. [`scripts/prerender.js`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/scripts/prerender.js) — Added static injection of `<meta name="robots">`, JSON-LD schema scripts, and `dist/sitemap.xml` generator.
6. [`public/robots.txt`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/public/robots.txt) — Created production crawl directives.
7. [`docs/website-rebuild/PHASE-3-TECHNICAL-SEO-ENTITY-FOUNDATION.md`](file:///Users/rajatshakya/.gemini/antigravity/scratch/aursa/docs/website-rebuild/PHASE-3-TECHNICAL-SEO-ENTITY-FOUNDATION.md) — Phase 3 technical documentation.

---

## 10. Deferred Work & Scope Boundaries Retained

- **No Visible UI Redesign**: Page layouts, typography, styling, and copy remain unchanged.
- **No Unbuilt Pages Created**: `/retail`, `/app`, and future SEO pillar pages were NOT created.
- **No Fake Business Claims**: No fake user counts, ratings, addresses, funding metrics, or legal claims were added to schema or copy.
- **No Media or Code Splitting Modifications**: 39 MB background video and JS chunk bundling optimisations deferred to performance phase.
- **No Product/Backend Logic Changes**: `src/pages/Mirror.jsx`, Supabase integration, RevenueCat, and authentication code were left untouched.

---

## 11. Mandatory Post-Deployment Production Verification Checklist

Because local static builds cannot test live Vercel HTTP response headers, the following live checks must be executed upon Vercel deployment:

- [ ] Fetch `https://aursa.app/sitemap.xml` and verify HTTP 200 header and valid XML parsing.
- [ ] Fetch `https://aursa.app/robots.txt` and verify HTTP 200 header.
- [ ] Fetch `https://aursa.app/investors` and verify HTTP 200 header and `<meta name="robots" content="noindex, follow">`.
- [ ] Fetch `https://aursa.app/privacy-policy` and verify HTTP 301 redirect to `https://aursa.app/privacy`.
- [ ] Test `https://aursa.app/` using Google Rich Results Test to verify `Organization` and `WebSite` structured data detection.
- [ ] Test `https://aursa.app/blog/what-makes-an-outfit-feel-right` using Google Rich Results Test to verify `BlogPosting` and `BreadcrumbList` detection.

---

## 12. Phase 3 Final Verification Audit Summary

- **Organization Logo URL**: `https://aursa.app/aursa-logo.svg` (Verified: asset exists in `public/aursa-logo.svg` -> `dist/aursa-logo.svg` and uses canonical non-www HTTPS host).
- **datePublished Source**: Extracted from explicit article frontmatter `date` key (`YYYY-MM-DD`).
- **dateModified Result**: Omitted across all 5 articles because no explicit `updatedAt` key is recorded in frontmatter.
- **Article Author Result**: Organization (`https://aursa.app/#organization`, name: `"AURSA"`), matching visible brand attribution on journal pages.
- **Verified sameAs Profiles**:
  - Instagram: `https://www.instagram.com/aursa.ai/`
  - LinkedIn: `https://www.linkedin.com/company/aursa`
  - X/Twitter: `https://x.com/AursaAI`
  (Verified as explicit official brand social links in `ContactPage.jsx` and `Footer`).
- **Host Consistency**: All schema entities, `@id` identifiers, canonical tags, sitemap entries, and logo links strictly use `https://aursa.app`.
- **Client-Side Hash Migration Mappings**: `/#/about`, `/#/contact`, `/#/privacy-policy`, `/#/journal`, `/#/blog/:slug` handle fragment migration on client mount via `LegacyHashRedirect` (`window.history.replaceState`). Correctly categorized as Client-Side Hash Migration.
- **Server-Side Permanent Redirect Mappings**: `/privacy-policy` -> `/privacy` (HTTP 301 via `vercel.json` redirects rule).
- **Final Sitemap Count**: 10 indexable, canonical URLs.
- **Live Production Status**: **LIVE PRODUCTION VERIFICATION PENDING** (Static build verified locally; post-deployment live HTTP checks remain a launch gate).
