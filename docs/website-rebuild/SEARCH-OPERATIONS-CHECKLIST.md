# AURSA SEARCH OPERATIONS CHECKLIST

This checklist defines standard search infrastructure operational procedures for AURSA across deployments, page additions, editorial publishing, and ongoing search performance monitoring.

---

## 1. AFTER EVERY SIGNIFICANT DEPLOYMENT

- [ ] **Verify Production Deployment**: Confirm `https://aursa.app` is serving the latest build assets (HTML static pages, JS bundles, and static files).
- [ ] **Verify Sitemap Accessibility**: Fetch `https://aursa.app/sitemap.xml` and ensure HTTP status `200 OK` with 17 canonical URLs.
- [ ] **Verify Robots.txt Accessibility**: Fetch `https://aursa.app/robots.txt` and ensure HTTP status `200 OK` referencing `https://aursa.app/sitemap.xml`.
- [ ] **Canonical Spot-Check**: Fetch key landing page HTML (`/`, `/retail`, `/app`, `/insights`) and confirm `<link rel="canonical">` points to the absolute HTTPS URL.
- [ ] **HTTP Status & Redirect Verification**: Confirm canonical routes return `200 OK`, `/journal` redirects (301) to `/insights`, `/privacy-policy` redirects (301) to `/privacy`, and unknown routes return `404 Not Found`.

---

## 2. AFTER ADDING A NEW PUBLIC PAGE

- [ ] **Canonical Declaration**: Ensure the new route is registered in `src/lib/seoRegistry.js` with absolute HTTPS canonical URL.
- [ ] **Sitemap Inclusion**: Verify the route is added to `scripts/prerender.js` and included in generated `dist/sitemap.xml` (only if indexable canonical page).
- [ ] **Internal Linking Check**: Ensure the new page receives contextually relevant internal links from existing hub or pillar pages.
- [ ] **Google Search Console Inspection**: Inspect the new URL via Google Search Console URL Inspection Tool.
- [ ] **Indexing Request**: If newly launched strategic page, click **Request Indexing** (do not spam repeat requests).
- [ ] **IndexNow Notification**: Trigger IndexNow ping if IndexNow integration is active.

---

## 3. AFTER PUBLISHING A NEW ARTICLE (AURSA INSIGHTS)

- [ ] **Article Canonical Verification**: Confirm `<link rel="canonical" href="https://aursa.app/blog/<slug>">` is present.
- [ ] **Structured Data Verification**: Verify `BlogPosting` JSON-LD schema is present with valid `headline`, `image`, `datePublished`, `author`, and `publisher`.
- [ ] **Breadcrumb Verification**: Verify `BreadcrumbList` JSON-LD schema traces `Home > Insights > <Article Title>`.
- [ ] **Hub Discovery**: Confirm article appears on `/insights` grid under appropriate track (Retail Intelligence or Personal Style Intelligence).
- [ ] **Sitemap Inclusion**: Verify slug is registered in `scripts/prerender.js` and appears in `dist/sitemap.xml`.
- [ ] **IndexNow Ping**: Notify search engines via IndexNow API if enabled.

---

## 4. MONTHLY SEARCH OPERATIONS REVIEW

- [ ] **Google Search Console Performance Review**:
  - Review total impressions, clicks, CTR, and average position across Site, Page, and Query levels.
  - Review performance for strategic query groups: Retail (`smart fitting room`, `fitting room analytics`, etc.), Consumer (`AI outfit analyzer`, `personal style app`), Brand (`AURSA`).
- [ ] **Bing Webmaster Tools Review**:
  - Review Bing performance metrics, search queries, and page impressions.
- [ ] **Page Indexing / Coverage Audit**:
  - Check Page Indexing reports in GSC and Bing for unexpected exclusions (`Crawled - currently not indexed`, `Discovered - currently not indexed`).
  - Confirm intentional exclusions (`/journal`, `/privacy-policy`, `/mirror`, `/investors`) remain excluded/redirected without issue.
- [ ] **Position 5–20 Opportunity Analysis**:
  - Identify pages/queries ranking between positions 5 and 20.
  - Plan targeted content, internal link, or metadata optimizations (do not mechanically rewrite).
- [ ] **Low CTR Optimization**:
  - Identify queries with strong impressions but below-average CTR.
  - Evaluate title and meta description relevance and clarity (no clickbait).
- [ ] **Security & Manual Actions**:
  - Verify zero Security Issues and zero Manual Actions in Google Search Console and Bing.
