# PHASE 13.5 — UX/UI REFINEMENT STRATEGY & WIREFRAME ARCHITECTURE

## 1. EXECUTIVE DESIGN DIAGNOSIS
The technical foundation of the AURSA website rebuild (Phases 0–13) is complete, live, prerendered, and search-engine discoverable. However, from a visual design and user experience standpoint, the current website falls short of feeling like a premium, fashion-forward commercial entity. 

Currently, the homepage suffers from structural repetition: almost every section is laid out as two equal split panels or side-by-side cards comparing "Retail" vs. "Personal". This creates a comparison-heavy, strategy-deck aesthetic rather than a sleek, confident commercial presentation. Furthermore, the homepage forces visitors to choose between Retail and Personal immediately in the hero, weakening the primary commercial message: **AURSA is decision intelligence for fashion retail.**

---

## 2. FOUNDER REQUIREMENTS
1. **Eliminate Repetitive Split-Panel UX**: Stop designing sections as two equal side-by-side cards ("Retail vs. Personal"). One page must communicate one primary narrative at a time.
2. **Retail-First Homepage**: The homepage must primarily sell **AURSA For Fashion Retail** to enterprise retail leaders, decision-makers, and store innovation executives.
3. **Consumer (B2C) Product as Interlude**: The consumer/personal product story should appear only as a smaller, dedicated interlude section on the homepage, pointing visitors to the full `/app` page.
4. **Preserve Authority & Tone**: Maintain AURSA’s editorial, calm, restrained, fashion-forward character ("Simple on the surface. Intelligent underneath.") without turning the site into a generic SaaS dashboard or AI cliché.

---

## 3. CURRENT HOMEPAGE PROBLEMS (TOP 10 UX ISSUES)
1. **Split-Hero Friction**: Compelling visitors to choose "All / In Store / Before Stepping Out" before understanding what AURSA actually does.
2. **Repetitive Dual-Card Pattern**: Sections 1, 3, and 4 repeat side-by-side card containers, producing visual monotony.
3. **Competing CTAs**: Equal emphasis on "Request a Pilot" and "Download App" dilutes conversion clarity.
4. **Overuse of Containers**: Nested border boxes inside dark backgrounds create visual clutter instead of clean whitespace.
5. **Lack of Human Fashion Context**: Insufficient photography of real shoppers, fitting rooms, and garments.
6. **Abstract Metaphors Over Real Context**: Relying on generic icons/cards instead of showing the fitting-room moment.
7. **Pacing Monotony**: Every section uses dark background (`#0F0F13`) with subtle borders, lacking contrast and rhythm.
8. **Heavy Upfront Cognitive Load**: Explaining two complete business models simultaneously on a single homepage.
9. **Diluted B2B Value Proposition**: Enterprise retail leaders cannot easily scan commercial benefits without wading through consumer app copy.
10. **Mobile Stacking Clutter**: Desktop 2-column cards stack vertically into long, repetitive lists of bordered boxes on mobile viewports.

---

## 4. CURRENT VISUAL-SYSTEM PROBLEMS (TOP 10 UI ISSUES)
1. **Excessive Uppercase Micro-Labels**: Every section starts with a small copper eyebrow label, creating visual noise.
2. **Uniform Dark Surfaces**: Lack of light editorial contrast sections to break up visual fatigue.
3. **Generic Card Borders**: `border-white/10` containers make the site look like a developer dashboard.
4. **Typography Hierarchy Flatness**: Headline scales blend into sub-headings without dramatic editorial contrast.
5. **Underutilized Image Assets**: Absence of rich fitting-room and fabric detail visuals.
6. **Abstract SaaS Badges**: Reliance on tech badges instead of fashion-grade visual elements.
7. **Icon Overuse**: Relying on generic Lucide icons (`Sparkles`, `Building2`, `User`) in hero and features.
8. **Unfocused Focal Points**: Viewers' eyes wander between equal-weight UI boxes.
9. **Monotonous Card Gaps**: Fixed 8-gap grid layouts across dissimilar content types.
10. **Rigid Border-Radius Uniformity**: `rounded-2xl` on all elements creates a boxy, containerized feel.

---

## 5. NEW HOMEPAGE STRATEGIC ROLE
- **Target Audience**: Fashion Retail Executives, Innovation Directors, VP Store Operations, Merchandisers.
- **5-Second Clarity**: AURSA delivers fashion retail decision intelligence at the fitting-room decision moment—on the shopper's own phone, with no smart mirror required.
- **Narrative Principle**: 100% Retail-led commercial narrative, with a focused 1-section interlude introducing AURSA Personal and routing consumer visitors to `/app`.

---

## 6. NEW HOMEPAGE INFORMATION ARCHITECTURE (8 SECTIONS)
1. **Section 1: Retail Hero** (Primary B2B positioning & fitting-room focus)
2. **Section 2: The Fitting-Room Decision Problem** (Light editorial contrast section: "They liked it enough to try it. Now they have to decide.")
3. **Section 3: Shopper Journey & Trial Room Experience** (Interactive / visual 5-step fitting-room decision flow)
4. **Section 4: Retail Intelligence** (Dark graphite section: "Understand more than what sold.")
5. **Section 5: Zero-Hardware Deployment** (Shopper's Phone -> QR -> AURSA, low friction)
6. **Section 6: AURSA Personal Interlude** (Warm editorial section: "One Mirror. Two Moments." -> Route to `/app`)
7. **Section 7: Trust, Privacy & Insights Discovery** (Private by design + Insights articles)
8. **Section 8: Retail Pilot Commercial CTA** (Final conversion closure)

---

## 7. DETAILED HOMEPAGE TEXT WIREFRAME

### SECTION 1 — RETAIL HERO
- **Eyebrow**: AURSA FOR FASHION RETAIL
- **Headline**: Make the fitting-room decision more confident.
- **Supporting Copy**: AURSA gives shoppers a private, personalized second opinion at the moment they are deciding whether a look actually works — using their own phone, without requiring a smart mirror.
- **Primary Visual**: High-fashion editorial photography of a shopper in an elegant fitting room, holding their phone in front of a mirror with a subtle, non-intrusive AURSA decision interface.
- **Layout**: Asymmetric 60/40 layout. Left side: Bold editorial headline, concise value proposition, primary CTA ("Request a Retail Pilot"), secondary link ("See How It Works"). Right side: Full-bleed vertical photographic frame.
- **Desktop Behavior**: 60% text content / 40% tall fashion portrait frame.
- **Mobile Behavior**: Single-column hero. Headline -> Copy -> CTA Stack -> Fitting-Room Photography Frame.

### SECTION 2 — THE FITTING-ROOM DECISION PROBLEM
- **Eyebrow**: THE DECISION MOMENT
- **Headline**: They liked it enough to try it. Now they have to decide.
- **Supporting Copy**: The shopper has already discovered the garment, selected their size, and stepped into the fitting room. The question is no longer "What should I browse?" It is "Does this look actually work for me?"
- **Primary Visual**: Minimalist horizontal progression timeline or light editorial typography layout.
- **Background**: Off-white / light stone backdrop (`#F5F5F7` text on `#1A1A22` or light gray section) for visual contrast.
- **Layout**: Full-width editorial statement, generous padding, zero cards.

### SECTION 3 — SHOPPER JOURNEY & TRIAL ROOM EXPERIENCE
- **Eyebrow**: THE TRIAL-ROOM MOMENT
- **Headline**: See where AURSA enters the decision.
- **Supporting Copy**: An illustrative look at the moment between trying something on and deciding what to do next.
- **Primary Visual**: Signature 5-step decision progression:
  1. `01 TRY`: Shopper steps into the fitting room.
  2. `02 PAUSE`: Uncertainty creates hesitation in front of the mirror.
  3. `03 OPEN AURSA`: Shopper scans QR / opens app on their own phone.
  4. `04 SECOND OPINION`: AURSA delivers private, visual feedback on fit and balance.
  5. `05 DECIDE`: Shopper steps out with purchase clarity.
- **Layout**: Clean horizontal step-sequence on desktop; interactive phone screen frame alongside step details.

### SECTION 4 — RETAIL INTELLIGENCE
- **Eyebrow**: DECISION INTELLIGENCE
- **Headline**: Understand more than what sold.
- **Supporting Copy**: Purchase data tells you what left the store. AURSA helps retailers understand shopper consideration, decision engagement, styling questions, and recommendation interaction at the fitting room.
- **Primary Visual**: Clean data signal rows (not generic dashboard cards):
  - *Where shoppers pause*
  - *Which styling questions recur*
  - *Which recommendations shoppers engage with*
  - *Which shopping contexts appear most often*
  - *Where add-on suggestions become relevant*
- **Layout**: Dark graphite backdrop (`#121217`), editorial data rows with subtle copper accents.

### SECTION 5 — ZERO-HARDWARE DEPLOYMENT
- **Eyebrow**: LOW-FRICTION IMPLEMENTATION
- **Headline**: No smart mirror required.
- **Supporting Copy**: AURSA is designed to work through the shopper's own phone, allowing fashion retailers to test and deploy decision intelligence without rebuilding fitting rooms or installing expensive hardware.
- **Primary Visual**: 3-stage flow diagram: `FITTING ROOM` -> `SHOPPER PHONE` -> `AURSA`.
- **Layout**: Wide horizontal layout with clean connectors.

### SECTION 6 — AURSA PERSONAL INTERLUDE
- **Eyebrow**: BRAND ORIGIN & CONSUMER APP
- **Headline**: One mirror. Two moments.
- **Supporting Copy**: AURSA started with the same question people ask at home: *“Should I wear this?”* AURSA Personal gives individuals that same private second opinion before they step out.
- **Primary Visual**: Lifestyle imagery of a personal mirror check, featuring App Store & Google Play badges and a direct link to the full consumer experience.
- **CTA**: `Explore AURSA Personal` -> `/app`

### SECTION 7 — TRUST, PRIVACY & INSIGHTS DISCOVERY
- **Eyebrow**: PRIVACY BY DESIGN & RESEARCH
- **Headline**: Private by design. Built on fashion intelligence.
- **Supporting Copy**: Outfit photos are never stored. AURSA uses real-time computer vision solely during the analysis session.
- **Layout**: 2-column editorial split: Left = Privacy promise; Right = Featured Insights guides (`/smart-fitting-room`, `/personal-style-intelligence`).

### SECTION 8 — RETAIL PILOT COMMERCIAL CTA
- **Eyebrow**: GET STARTED
- **Headline**: Bring AURSA into your fitting rooms.
- **Supporting Copy**: Speak with our team to explore a focused retail pilot designed for your stores.
- **Primary CTA**: `Request a Retail Pilot`
- **Layout**: Centered, high-impact dark section with copper border accent line.

---

## 8. `/RETAIL` PAGE ROLE & WIREFRAME
- **Role**: Deep commercial, pilot, and product specification page for retail decision-makers who want full details after exploring the homepage.
- **Section Sequence**:
  1. Commercial Hero (Pilot focus, low-friction entry)
  2. The Fitting Room Decision Gap (In-depth analysis of try-on vs purchase)
  3. Interactive Trial Room Simulator (Full interactive demo)
  4. Retail Intelligence Signals (Detailed metric breakdown)
  5. Deployment & Store Integration Specs (QR codes, staff workflow, privacy compliance)
  6. Pilot Structuring & Roadmap (4-week test framework)
  7. Enterprise Contact / Pilot Application Form

---

## 9. `/APP` PAGE ROLE & WIREFRAME
- **Role**: Dedicated B2C consumer product landing page for individual users seeking an AI outfit checker and personal style intelligence app.
- **Section Sequence**:
  1. Consumer Hero ("Does this actually work for me?" + App Store / Play Store badges)
  2. The Personal Mirror Moment (Outfits for work, events, daily wear)
  3. How AURSA Analyzes Looks (Harmony, visual balance, contrast, fit)
  4. Personal Style Intelligence (Understanding your style fingerprint over time)
  5. Privacy First (Photos stay private)
  6. Download CTAs & App Badges

---

## 10. DESIGN SYSTEM SPECIFICATIONS

### TYPOGRAPHY SYSTEM
- **Display / Heading Font**: `Instrument Serif` (Serif) — Reserved for primary headlines (`H1`, `H2`) to convey fashion-forward editorial sophistication.
- **Body & Interface Font**: `Inter` (Sans-Serif) — Clean, legible, neutral for UI, body copy, and metrics.
- **Micro-Label Font**: `Questrial` (Sans-Serif) — For subtle tracking labels where navigation context is needed.
- **Hierarchy Scale**:
  - `H1`: 56px–72px (Desktop) / 36px–44px (Mobile)
  - `H2`: 36px–48px (Desktop) / 28px–32px (Mobile)
  - `H3`: 22px–28px (Desktop) / 18px–20px (Mobile)
  - `Body`: 16px–18px (Desktop) / 15px–16px (Mobile)
  - `Micro-Labels`: 10px–12px uppercase, tracking `[0.25em]`

### COLOR SYSTEM
- **Primary Background**: Near-black `#0F0F13`
- **Secondary Dark Surface**: Charcoal `#16161C`
- **Light Contrast Surface**: Off-white / Stone `#F5F5F7` (Used strategically for editorial sections like Section 2)
- **Primary Accent**: Warm Copper `#D88A3D` (Used deliberately for active states, key highlights, primary CTAs)
- **Secondary Accent**: Soft Gold `#E0A868`
- **Primary Text**: `#F5F5F7` (Dark surfaces) / `#0F0F13` (Light surfaces)
- **Secondary Text**: Muted Gray `#A1A1AA`
- **Border Utility**: `rgba(255,255,255,0.08)` (Subtle, non-distracting)

### SPACING & LAYOUT SYSTEM
- **Desktop Section Padding**: `pt-28 pb-28` (112px) to allow calm whitespace.
- **Mobile Section Padding**: `pt-16 pb-16` (64px).
- **Max Content Width**: `1200px` for main containers, `680px` for text columns.
- **Grid Gaps**: `gap-8` to `gap-12` (avoiding tight card clusters).

### PHOTOGRAPHY & IMAGERY SYSTEM
- **Style**: High-fashion editorial photography, natural warm lighting, elegant fitting-room environments, subtle mirror reflections.
- **Subject Matter**: Real shoppers holding phones in front of mirrors, garment detail close-ups, fabric textures.
- **Avoid**: Generic tech stock photos, glowing holograms, AI brains, corporate office scenes, futuristic blue grids.

### CARD REDUCTION STRATEGY
- **Rule**: Information is laid out as full-width editorial statements, horizontal lists, or typography rows by default. Cards are strictly reserved for:
  1. Insights articles grid on `/insights`
  2. Discrete standalone resource guides
- **Removed Cards**: Dual-panel Retail vs Personal hero cards, 4-card feature blocks.

---

## 11. SECTION REORGANIZATION PLAN
- **REMOVE**: Split-panel hero choice buttons ("All / In Store / Before Stepping Out"), redundant dual-card comparison sections.
- **MERGE**: Secondary brand promises into Section 7 (Privacy & Trust).
- **MOVE**: Detailed B2C consumer app feature breakdowns -> `/app`.
- **MOVE**: Deep fitting-room pilot specs -> `/retail`.
- **PRESERVE**: 17 canonical URLs, sitemap, prerender scripts, SEO title/meta schemas, PostHog/GA4 analytics triggers.

---

## 12. PERMANENT UX/UI PRINCIPLES (10 RULES)
1. **One narrative per section.** Never force Retail and Personal into competing columns.
2. **Editorial before dashboard.** Design like a fashion brand, not an enterprise SaaS portal.
3. **The homepage sells Retail.** Consumer features belong on `/app`.
4. **Human context over abstract tech.** Show real shoppers in real fitting rooms.
5. **Cards only when data behaves like cards.** Default to editorial typography and clean rows.
6. **Whitespace is structure.** Allow generous breathing room between sections.
7. **Color with restraint.** Warm copper is an accent, not a background fill.
8. **Contrast creates rhythm.** Alternate between dark charcoal and light stone surfaces.
9. **Mobile is designed, not stacked.** Craft separate single-column mobile compositions.
10. **Simple on the surface, intelligent underneath.** Keep UI overlays minimal and clear.

---

## 13. IMPLEMENTATION SAFETY CONSTRAINTS
- **Zero Production Code Edits in Phase 13.5**: Strategy document only.
- **Zero Build / Routing Breaking Changes**: All 18 routes, 17 sitemap URLs, prerendering, and canonical tags remain untouched.
- **Zero Analytics Event Renaming**: `homepage_retail_selected`, `homepage_personal_selected`, `retail_pilot_requested` remain compatible.
