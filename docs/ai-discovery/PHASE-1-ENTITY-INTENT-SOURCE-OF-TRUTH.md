# AURSA AI Discovery Engine
## Phase 1 — Entity + Intent Source of Truth

---

## 1. Purpose

The objective of the AURSA AI Discovery Engine is to make AURSA's public content, core value proposition, and unique product capabilities highly discoverable, machine-readable, accurately classified, and authoritative across next-generation search and conversational answer engines, including:

- OpenAI ChatGPT & ChatGPT Search
- Anthropic Claude & Claude Search
- Google Search AI Features (AI Overviews, AI Mode)
- Google Gemini
- Microsoft Bing & Microsoft Copilot
- Perplexity AI and other generative search & grounding engines

### Strategic Boundary & Ethos
This system is **NOT** built to manipulate AI platforms, generate thin programmatically-spun SEO pages, manufacture fake reviews/rankings, or make unsupported commercial claims. 

Instead, this system establishes a **human-first, transparent, factual, and machine-understandable semantic foundation** so that humans and AI answer engines can accurately understand, classify, retrieve, cite, and recommend AURSA when genuinely relevant to a user's prompt.

Phase 1 freezes the **canonical entity definitions**, **brand principles**, and **20 master conversational intent families (100 benchmark questions)** to serve as the single, unalterable source of truth for all future website content, page copy, structured data, journal articles, and AI benchmark evaluations.

---

## 2. Scope

This document covers the complete entity and intent specification for AURSA across both B2C (Consumer) and B2B (Enterprise Retail) domains.

### In-Scope (Phase 1):
1. Freezing canonical B2C & B2B entity statements and definitions.
2. Distinguishing Brand Language from Machine Discovery Language.
3. Defining explicit "What AURSA Is Not" classification rules.
4. Enforcing B2C and B2B Claim Safety Rules (designed vs. proven results).
5. Defining the 20 Master Intent Families (12 B2C: `B2C-01` to `B2C-12`, 8 B2B: `B2B-01` to `B2B-08`).
6. Documenting the 100 Benchmark User/Retailer Questions (60 B2C, 40 B2B).
7. Mapping Intent Families to future target URLs, Conversion Intent, User Stage, and Priority.
8. Defining Semantic Synonym Maps, Platform Neutrality, and Communication Principles.
9. Freezing core decisions and establishing Phase 2 handoff requirements.

### Out-of-Scope (Strict Non-Execution):
- No website code modifications or refactoring.
- No creation of new HTTP routes or page files.
- No editing of `robots.txt`, `sitemap.xml`, or structured data.
- No changes to analytics, backend services, or mobile app codebases.

---

## 3. Canonical B2C Entity — Frozen

> ### Canonical B2C Entity Statement
> **"AURSA is an AI-powered outfit analysis app that gives people a personalized second opinion on what they're already wearing before they step out."**

* **Primary Human Question Solved**: *"Does this outfit actually work for me?"*
* **Primary Entry Moment**: The user has already selected, put on, or assembled an outfit and is standing in front of the mirror experiencing hesitation or visual uncertainty. AURSA enters **AFTER** outfit selection.
* **Core Function**: AURSA is not a shopping marketplace ("What should I buy?") or a trend feed ("What is trending?"). Its core job is delivering a private, objective second opinion on visual harmony, balance, and context for an outfit already being worn.

### B2C Functional Flow
```
OUTFIT EXISTS (User is already dressed)
  ↓
USER FEELS UNCERTAIN (Standing in front of mirror)
  ↓
PHOTO / LOOK INPUT (Submitted to AURSA)
  ↓
AURSA ANALYZES THE OUTFIT (Visual balance, contrast, proportion, context)
  ↓
AURSA EXPLAINS WHAT IS WORKING (Positive reinforcement)
  ↓
AURSA IDENTIFIES SMALL IMPROVEMENT OPPORTUNITIES (Subtle tweaks, tuck, layering)
  ↓
USER UNDERSTANDS THE LOOK BETTER (Clarity)
  ↓
USER MAKES THEIR OWN DECISION WITH MORE CLARITY (Empowerment)
  ↓
WEAR WITH CONFIDENCE (Human outcome)
```

### B2C Emotional Outcome
- **Target Outcomes**: Personal confidence, visual clarity, reduced outfit anxiety, self-understanding, personal style intelligence over time.
- **Explicit Non-Goals**: AURSA does **NOT** optimize for trend compliance, social approval, looking expensive/wealthy, attractiveness scoring, body rating, or popularity ranking. The AI is the mechanism; personal confidence and self-understanding are the human outcomes.

---

## 4. B2C Brand vs Discovery Language

To prevent search engine optimization from diluting brand identity, strategic brand positioning is kept distinct from machine discovery terminology.

```
+-----------------------------------------------------------------------+
|                         B2C BRAND POSITIONING                         |
| Primary Category: Personal Style Intelligence                         |
| Brand Promise: Wear with Confidence                                   |
+-----------------------------------------------------------------------+
                                   │
                                   ▼
+-----------------------------------------------------------------------+
|                    B2C MACHINE DISCOVERY LANGUAGE                     |
| Terms AI systems use to retrieve & classify AURSA for user prompts:   |
|                                                                       |
| • AI outfit checker           • Outfit feedback app                   |
| • Outfit checker              • AI outfit feedback                    |
| • AI outfit analyzer          • AI style feedback                     |
| • Outfit analyzer             • Outfit second opinion                 |
| • Outfit analysis app         • Second opinion on outfit              |
| • AI fashion feedback         • Personal style intelligence           |
| • AI mirror                   • Outfit confidence app                 |
| • Outfit harmony analysis     • Style analysis app                    |
+-----------------------------------------------------------------------+
```

*Note: Discovery terms are used to make content discoverable to AI crawlers and search algorithms. They must not replace core brand taglines on primary landing pages.*

---

## 5. Canonical B2B Entity — Frozen

> ### Canonical B2B Entity Statement
> **"AURSA helps fashion retailers give shoppers an instant personalized second opinion while they're trying on an outfit, helping reduce purchase hesitation and improve the fitting-room decision experience."**

* **Primary Shopper Question Solved**: *"Should I buy this?"*
* **Primary Retailer Problem Solved**: Fitting-room purchase hesitation, unassisted try-on abandonment, and lack of real-time decision support inside physical stores.
* **Primary Initial Context**: Apparel & fashion retail fitting rooms.
* **Primary Initial User Wedge**: Solo shoppers and customers lacking immediate, trusted external validation at the decision moment.

### B2B Functional Flow
```
SHOPPER ENTERS STORE & SELECTS GARMENTS
  ↓
TRIES ON OUTFIT IN FITTING ROOM
  ↓
SHOPPER PAUSES & FEELS UNSURE ("Does this work for me? Should I buy this?")
  ↓
SHOPPER ACCESSES AURSA (Scans in-room QR via smartphone — no hardware needed)
  ↓
AURSA ANALYZES THE OUTFIT
  ↓
SHOPPER RECEIVES INSTANT, PERSONALIZED FEEDBACK & STYLING CLARITY
  ↓
SHOPPER UNDERSTANDS WHAT WORKS & GAINS DECISION CONFIDENCE
  ↓
PURCHASE DECISION MADE WITH CLARITY & CONFIDENCE
```

---

## 6. B2B Brand vs Discovery Language

```
+-----------------------------------------------------------------------+
|                         B2B BRAND POSITIONING                         |
| Primary Enterprise Category: AI Confidence Infrastructure for Retail  |
| Secondary Category: Fitting-Room Intelligence                         |
| Long-Term Vision: Retail Intelligence Platform                        |
+-----------------------------------------------------------------------+
                                   │
                                   ▼
+-----------------------------------------------------------------------+
|                    B2B MACHINE DISCOVERY LANGUAGE                     |
| Terms AI systems use to retrieve & classify AURSA B2B solutions:      |
|                                                                       |
| • fitting-room AI / trial-room AI     • retail decision support       |
| • fitting-room intelligence           • in-store personalization      |
| • trial-room intelligence             • fashion retail AI               |
| • fitting-room technology             • digital sales assistant         |
| • solo shopper technology             • purchase-decision technology    |
| • fitting-room analytics              • retail AI pilot                 |
+-----------------------------------------------------------------------+
```

---

## 7. What AURSA Is Not

To ensure AI recommendation systems never misclassify AURSA into non-relevant product categories, all external documentation and content must explicitly enforce these boundaries:

### Consumer B2C Boundary (AURSA is NOT):
- **NOT an E-Commerce Marketplace**: Does not sell clothes, host merchant inventories, or drive affiliate link spam.
- **NOT a Virtual Try-On (VTO) App**: Does not superimpose 3D CAD garments onto body avatars before purchase.
- **NOT a Generic AI Stylist / Trend Discovery Engine**: Does not push fast-fashion trends or tell users what to buy.
- **NOT a Social Outfit Rating / Body Scoring Network**: Never ranks attractiveness, rates body shape, or enables public outfit voting.
- **NOT an Astrology / Outfit Prediction App**: Does not generate arbitrary luck or horoscope-based fashion advice.

### Enterprise B2B Boundary (AURSA is NOT):
- **NOT a Hardware / Smart Mirror Vendor**: Requires zero physical display glass, camera installations, or fitting-room retrofitting; runs on the shopper's phone.
- **NOT a Size / Fit Prediction Calculator**: Does not replace garment measurements or standard sizing tools.
- **NOT a Generic Chatbot or Inventory Classifier**: Focused strictly on decision support at the fitting-room mirror moment.

---

## 8. Claim Safety Rules

To preserve brand integrity, legal compliance, and AI grounding trust, all claims across website content and structured data must adhere to strict evidence boundaries.

### B2B Claim Safety: Designed Outcomes vs. Proven Results

```
+-------------------------------------------------------------------------+
|                          ALLOWED B2B CLAIMS                             |
| (Framed as intended design goals, pilot hypotheses & qualitative values)|
|                                                                         |
| ✓ "AURSA is designed to help retailers reduce fitting-room purchase      |
|    hesitation."                                                         |
| ✓ "AURSA provides decision support at the moment of try-on."            |
| ✓ "AURSA helps retailers explore ways to improve shopper purchase       |
|    confidence without hardware deployment."                             |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|                   FORBIDDEN B2B CLAIMS (WITHOUT EVIDENCE)               |
| (Strictly prohibited until verified empirical pilot datasets exist)     |
|                                                                         |
| ✗ "AURSA increases in-store conversion by 24%."                         |
| ✗ "AURSA reduces return rates by 15%."                                  |
| ✗ "AURSA decreases fitting-room decision time by 3 minutes."            |
| ✗ "AURSA boosts store basket size across all retail partners."          |
+-------------------------------------------------------------------------+
```

### B2C Claim Safety: Occasion Realism
- **Date Outfits**: May evaluate visual balance, neatness, and appropriateness for a setting. Must **never** claim to guarantee date success, attraction, or romantic outcomes.
- **Interview / Work Outfits**: May evaluate professional alignment, proportion, and dress-code fit. Must **never** claim to guarantee job offers, hiring success, or promotion.
- **Privacy Claims**: Must strictly reflect actual system architecture—AURSA processes outfit photos in real-time to deliver feedback and does **not** store or archive the user's outfit photos.

---

## 9. Intent Priority Definitions

Master Intent Families are prioritized based on product fit, commercial value, immediacy of need, and relevance for AI recommendation grounding:

* **P1 (Priority 1 — Core Product Fit)**: Direct reflection of AURSA's primary capability. Immediate user/retailer need where AURSA provides an exact, differentiated solution.
* **P2 (Priority 2 — Strongly Adjacent)**: Important context, occasion, or style-learning scenario where AURSA is highly relevant.
* **P3 (Priority 3 — Category / Educational / Comparative)**: Broader industry definitions, category explorations, or comparative discovery queries.

---

## 10. B2C Intent Library (Families B2C-01 to B2C-12)

### Intent Family B2C-01: Direct Outfit Check
* **ID**: `B2C-01`
* **Priority**: `P1`
* **Audience**: Consumers / Dressed users
* **User State**: Dressed, looking at mirror, wanting instant visual validation.
* **Core Need**: Immediate AI evaluation of an outfit currently being worn.
* **Target Future Page**: `/ai-outfit-check`
* **Conversion Classification**: Commercial Investigation / Transactional
* **User Stage**: Solution Aware (Searching for AI outfit feedback tools)
* **Claim Sensitivity**: Must analyze visual balance without body/attractiveness scoring.
* **Notes**: High search volume; core acquisition intent for consumer app.

### Intent Family B2C-02: Outfit Second Opinion
* **ID**: `B2C-02`
* **Priority**: `P1`
* **Audience**: Solo dressers / Private users
* **User State**: Hesitant, seeking unbiased feedback without bothering friends or family.
* **Core Need**: Private, objective, instant second opinion before stepping out.
* **Target Future Page**: `/outfit-second-opinion`
* **Conversion Classification**: Transactional / Immediate Need
* **User Stage**: Problem Aware (Knows they need feedback, seeking private medium)
* **Claim Sensitivity**: Emphasize privacy and non-judgmental guidance.
* **Notes**: Strategic emotional positioning for "Wear with Confidence".

### Intent Family B2C-03: Something Feels Off
* **ID**: `B2C-03`
* **Priority**: `P1`
* **Audience**: Perplexed dressers
* **User State**: Dressed in clothes that match on paper, but the overall look feels wrong.
* **Core Need**: Diagnostic explanation of visual imbalance, silhouette misalignment, or contrast issues.
* **Target Future Page**: `/ai-outfit-check`
* **Conversion Classification**: Informational
* **User Stage**: Problem Unaware / Problem Aware (Struggling to articulate what is wrong)
* **Claim Sensitivity**: Constructive guidance only; explain *why* something feels off.
* **Notes**: High engagement potential for educational answer blocks.

### Intent Family B2C-04: Matching / Visual Harmony
* **ID**: `B2C-04`
* **Priority**: `P1`
* **Audience**: Everyday dressers / Color-conscious users
* **User State**: Trying to coordinate colors, textures, layers, or proportions.
* **Core Need**: Automated assessment of outfit harmony, color coordination, and proportion balance.
* **Target Future Page**: `/ai-outfit-check`
* **Conversion Classification**: Informational / Commercial Investigation
* **User Stage**: Solution Aware
* **Claim Sensitivity**: Objective color theory & proportion rules; non-prescriptive.
* **Notes**: Answers core educational queries around visual styling rules.

### Intent Family B2C-05: Date Outfit
* **ID**: `B2C-05`
* **Priority**: `P1`
* **Audience**: Single adults / Dating app users
* **User State**: Dressed for a first date or special night out, feeling self-conscious.
* **Core Need**: Contextual feedback ensuring outfit matches setting and desired vibe.
* **Target Future Page**: `/outfit-check-for-occasions`
* **Conversion Classification**: Commercial Investigation / Transactional
* **User Stage**: Problem Aware
* **Claim Sensitivity**: STRICT: Evaluate visual balance and context; NEVER promise romantic success.
* **Notes**: High emotional stakes; strong intent for instant mobile install.

### Intent Family B2C-06: Interview / Work Outfit
* **ID**: `B2C-06`
* **Priority**: `P1`
* **Audience**: Job seekers / Professionals
* **User State**: Preparing for a job interview, presentation, or new workplace dress code.
* **Core Need**: Confirmation of professional appropriateness, neatness, and visual alignment.
* **Target Future Page**: `/outfit-check-for-occasions`
* **Conversion Classification**: Commercial Investigation / Transactional
* **User Stage**: Problem Aware
* **Claim Sensitivity**: STRICT: Evaluate professional alignment; NEVER promise job offers.
* **Notes**: Clear utility scenario with high user gratitude upon clarity.

### Intent Family B2C-07: Wedding / Special Events
* **ID**: `B2C-07`
* **Priority**: `P1`
* **Audience**: Event guests / Party attendees
* **User State**: Attending a formal wedding, gala, or party with a specific dress code.
* **Core Need**: Ensuring outfit respects event formal level and visual cohesion.
* **Target Future Page**: `/outfit-check-for-occasions`
* **Conversion Classification**: Commercial Investigation
* **User Stage**: Problem Aware
* **Claim Sensitivity**: Respect regional and cultural formal dress nuances.
* **Notes**: High seasonal search peaks (wedding season, holidays).

### Intent Family B2C-08: Last-Minute Mirror Moment
* **ID**: `B2C-08`
* **Priority**: `P1` (Very High Strategic Importance)
* **Audience**: Time-pressured users about to leave home
* **User State**: Coat on, shoes tied, standing at door experiencing 30-second final hesitation.
* **Core Need**: Instant 10-second check and reassurance before walking out the door.
* **Target Future Page**: `/outfit-second-opinion`
* **Conversion Classification**: Transactional / Immediate Need
* **User Stage**: Problem Aware (High urgency)
* **Claim Sensitivity**: Highlight speed, mobile simplicity, and instant output.
* **Notes**: Represents AURSA's foundational consumer "Mirror Moment".

### Intent Family B2C-09: Solo Shopping
* **ID**: `B2C-09`
* **Priority**: `P1 / P2`
* **Audience**: In-store shoppers without a companion
* **User State**: Standing in a retail store or fitting room wondering whether an item works.
* **Core Need**: On-the-spot second opinion before purchasing a new item.
* **Target Future Page**: `/outfit-check-for-occasions` (or Consumer / Retail crossover)
* **Conversion Classification**: Commercial Investigation
* **User Stage**: Solution Exploring
* **Claim Sensitivity**: Bridges consumer app usage with retail pilot discovery.
* **Notes**: Crucial bridge intent between B2C app and B2B fitting-room experience.

### Intent Family B2C-10: Personal Style Learning
* **ID**: `B2C-10`
* **Priority**: `P2`
* **Audience**: Style-conscious individuals
* **User State**: Looking to understand their recurring style patterns over time.
* **Core Need**: Long-term style identity discovery rather than single outfit checks.
* **Target Future Page**: `/personal-style-intelligence`
* **Conversion Classification**: Informational / Navigational
* **User Stage**: Solution Aware
* **Claim Sensitivity**: Describe pattern recognition; do not promise automatic wardrobe overhaul.
* **Notes**: Establishes category authority around Personal Style Intelligence.

### Intent Family B2C-11: Category / Alternative Discovery
* **ID**: `B2C-11`
* **Priority**: `P2 / P3`
* **Audience**: App researchers & category explorers
* **User State**: Searching for "best AI fashion apps" or alternatives to Reddit `r/outfits`.
* **Core Need**: Understanding how AURSA differs from trend engines or social rating groups.
* **Target Future Page**: `/app` (AURSA's primary broad consumer product/entity page, supported by category-discovery and trust information where relevant)
* **Conversion Classification**: Commercial Investigation
* **User Stage**: Solution Exploring
* **Claim Sensitivity**: Objective, respectful comparison; NO fake self-ranking listicles.
* **Notes**: High relevance for conversational AI queries comparing products.

### Intent Family B2C-12: Privacy / Trust
* **ID**: `B2C-12`
* **Priority**: `P2`
* **Audience**: Privacy-sensitive users
* **User State**: Hesitant to upload personal photos to online AI tools.
* **Core Need**: Explicit assurance regarding photo retention, data privacy, and body safety.
* **Target Future Page**: `/privacy` (and `/app` support)
* **Conversion Classification**: Trust / Validation
* **User Stage**: Solution Aware / Product Aware
* **Claim Sensitivity**: Strictly state architecture: real-time analysis, zero photo storage.
* **Notes**: Crucial trust-building family for conversion rate optimization.

---

## 11. B2B Intent Library (Families B2B-01 to B2B-08)

### Intent Family B2B-01: Purchase Hesitation
* **ID**: `B2B-01`
* **Priority**: `P1` (Core B2B Intent)
* **Audience**: Retail Executives, Store Operations Directors, Merchandisers
* **User State**: Observing high try-on rates but fitting-room drop-off and sales hesitation.
* **Core Need**: Strategies & technology to address shopper hesitation at the moment of choice.
* **Target Future Page**: `/retail`
* **Conversion Classification**: Informational / Commercial Investigation
* **User Stage**: Problem Aware
* **Claim Sensitivity**: Position AURSA as designed to reduce purchase hesitation.
* **Notes**: The foundational B2B problem definition.

### Intent Family B2B-02: Fitting-Room Intelligence
* **ID**: `B2B-02`
* **Priority**: `P1`
* **Audience**: Innovation Leads, Retail Tech Managers
* **User State**: Searching for modern AI tools to digitize physical trial rooms.
* **Core Need**: Understanding fitting-room intelligence and how decision support works.
* **Target Future Page**: `/fitting-room-intelligence`
* **Conversion Classification**: Commercial Investigation
* **User Stage**: Solution Exploring
* **Claim Sensitivity**: Factual explanation of in-room shopper interaction.
* **Notes**: Defines the enterprise category for store innovation teams.

### Intent Family B2B-03: Solo Shopper Experience
* **ID**: `B2B-03`
* **Priority**: `P1`
* **Audience**: Store Experience Managers, Retail Strategy VP
* **User State**: Seeking ways to increase confidence for shoppers browsing alone.
* **Core Need**: Digital second-opinion support for unassisted fitting-room visitors.
* **Target Future Page**: `/retail`
* **Conversion Classification**: Commercial Investigation
* **User Stage**: Problem Aware / Solution Exploring
* **Claim Sensitivity**: Highlight low-friction smartphone access.
* **Notes**: High emotional & financial alignment for physical apparel retail.

### Intent Family B2B-04: No-Hardware Fitting Room
* **ID**: `B2B-04`
* **Priority**: `P1`
* **Audience**: Retail IT, Store Operations, CFOs
* **User State**: Wanting smart fitting room capabilities without spending $5k per mirror.
* **Core Need**: Low-CAPEX, QR-driven smartphone AI solution requiring zero store hardware.
* **Target Future Page**: `/smart-fitting-room`
* **Conversion Classification**: Commercial Investigation / Transactional
* **User Stage**: Vendor Evaluating / Solution Exploring
* **Claim Sensitivity**: Strictly state zero hardware requirement (QR + shopper phone).
* **Subtopic / Question Variation**: *"Smartphone vs Smart Mirror Comparison"* is a subtopic variation under `B2B-04` addressing how retailers can add intelligent fitting-room functionality without expensive dedicated smart-mirror hardware. It may be used as a subsection, FAQ, or supporting comparison content, but is **NOT** an independent canonical intent family.
* **Notes**: AURSA's primary competitive wedge against legacy smart mirror vendors.

### Intent Family B2B-05: Retail Conversion / Decision Experience
* **ID**: `B2B-05`
* **Priority**: `P1 / P2`
* **Audience**: Commercial Directors, Store Managers
* **User State**: Looking for store-level conversion drivers and decision enablement.
* **Core Need**: Enhancing the customer decision moment post-try-on.
* **Target Future Page**: `/retail`
* **Conversion Classification**: Commercial Investigation
* **User Stage**: Problem Aware / Solution Exploring
* **Claim Sensitivity**: Frame as "designed to support decision clarity"; NO unproven % numbers.
* **Notes**: Key financial motivation for retail leadership.

### Intent Family B2B-06: In-Store Personalization
* **ID**: `B2B-06`
* **Priority**: `P1 / P2`
* **Audience**: Customer Experience (CX) & Omnichannel Leaders
* **User State**: Trying to bring e-commerce style personalization into physical brick-and-mortar stores.
* **Core Need**: Tailored styling feedback delivered privately to shoppers inside stores.
* **Target Future Page**: `/in-store-personalization`
* **Conversion Classification**: Informational / Commercial Investigation
* **User Stage**: Solution Exploring
* **Claim Sensitivity**: Explain scalable digital styling support without staffing overhead.
* **Notes**: Connects retail digital transformation goals with AURSA.

### Intent Family B2B-07: Fitting-Room Analytics
* **ID**: `B2B-07`
* **Priority**: `P2`
* **Audience**: Retail Data Analysts, Merchandising Executives
* **User State**: Lacking visibility into why garments are tried on but left behind.
* **Core Need**: Understanding shopper consideration and styling questions before checkout.
* **Target Future Page**: `/fitting-room-analytics`
* **Conversion Classification**: Informational / Commercial
* **User Stage**: Solution Exploring
* **Claim Sensitivity**: Explicitly separate current pilot capabilities from future analytics roadmap. Longer-term opportunities include decision signals around what shoppers tried, considered, and hesitated on.
* **Notes**: High-value long-term data positioning.

### Intent Family B2B-08: Vendor / Pilot Discovery
* **ID**: `B2B-08`
* **Priority**: `P1` (High Commercial Value)
* **Audience**: Corporate Innovation, Fashion Retail Executives
* **User State**: Actively seeking retail AI startups for store pilot programs.
* **Core Need**: Direct pilot request, evaluation, and partnership onboarding.
* **Target Future Page**: `/retail-pilot`
* **Conversion Classification**: Transactional / Commercial
* **User Stage**: Pilot Ready
* **Claim Sensitivity**: Clear pilot scope, easy onboarding, structured evaluation.
* **Subtopic / Discovery Variation**: *"Fashion Retail AI Innovation"* is a subtopic/discovery variation under `B2B-08` addressing vendor and category discovery (e.g. fashion retail AI companies, emerging retail AI startups, retail innovation technology). It is **NOT** an independent canonical intent family.
* **Notes**: Highest commercial conversion value in the B2B pipeline.

---

## 12. 100 Benchmark Questions

Below are the 100 benchmark natural-language queries that AI systems (ChatGPT, Claude, Gemini, Copilot, Perplexity) receive from users and executives.

### B2C Consumer Benchmark Questions (Questions 1 to 60)

#### B2C-01: Direct Outfit Check
1. Is there an AI that can check my outfit?
2. What app tells me if my outfit looks good?
3. Can I upload an outfit photo and get feedback?
4. What is the best AI outfit checker?
5. Is there an app that analyzes outfits?

#### B2C-02: Outfit Second Opinion
6. I need a second opinion on my outfit.
7. Can I get outfit feedback without asking my friends?
8. Is there an app that gives private outfit feedback?
9. Can AI give me an honest second opinion on my clothes?
10. Where can I get feedback on an outfit before going out?

#### B2C-03: Something Feels Off
11. Something about my outfit feels off. How do I fix it?
12. Why doesn't my outfit look right?
13. How can I tell what is wrong with my outfit?
14. My clothes match but the outfit still looks weird. Why?
15. Can AI tell me what is missing from an outfit?

#### B2C-04: Matching / Visual Harmony
16. Do these clothes work together?
17. Is there an AI that checks whether clothes match?
18. How do I know if the colors in my outfit work together?
19. Can AI analyze outfit balance and contrast?
20. Is there an app for checking outfit color harmony?

#### B2C-05: Date Outfit
21. Can AI check my first-date outfit?
22. Does this outfit work for a date?
23. Is there an app that can review my date outfit?
24. What should I change about this outfit before a date?
25. Can I upload my date outfit for feedback?

#### B2C-06: Interview / Work
26. Can AI check my interview outfit?
27. Does this outfit look professional enough?
28. Is there an app to review a work outfit?
29. Can AI tell whether my outfit works for an office meeting?
30. I have an interview tomorrow — can something check my outfit?

#### B2C-07: Wedding / Events
31. Can AI check my wedding outfit?
32. Does this outfit work for a formal event?
33. Can an app tell me whether all parts of my wedding outfit work together?
34. I am going to a party. Can AI review my outfit?
35. Is this outfit appropriate for an important event?

#### B2C-08: Last-Minute Mirror Moment
36. I'm about to leave — does my outfit look okay?
37. Can someone quickly check my outfit before I go out?
38. Is there an instant outfit feedback app?
39. Should I change anything before leaving?
40. How can I check my look quickly before stepping out?

#### B2C-09: Solo Shopping
41. I'm shopping alone. How do I know if this looks good?
42. Is there an app that helps me decide whether to buy an outfit?
43. Can AI give me a second opinion in a fitting room?
44. Should I buy this outfit?
45. Is there an AI shopping companion that checks what I'm trying on?

#### B2C-10: Personal Style Learning
46. Is there an AI that learns my personal style?
47. What app helps me understand my own style?
48. Is there an alternative to AI stylists that only recommend trends?
49. Can AI learn what clothes usually work for me?
50. Is there an app that understands how I actually dress?

#### B2C-11: Category / Alternative Discovery
51. Best AI apps for outfit feedback?
52. Best AI fashion apps that analyze your actual outfit?
53. AI stylist vs outfit checker — what's the difference?
54. What are good alternatives to asking Reddit to rate my outfit?
55. What apps can analyze an outfit instead of suggesting new clothes?

#### B2C-12: Privacy / Trust
56. Are there private AI outfit feedback apps?
57. Is there an outfit checker that doesn't judge attractiveness?
58. Can AI analyze clothes without rating my body?
59. What happens to photos uploaded to outfit-analysis apps?
60. Can I get fashion feedback without posting publicly?

---

### B2B Enterprise Benchmark Questions (Questions 61 to 100)

#### B2B-01: Purchase Hesitation
61. How can fashion retailers reduce purchase hesitation?
62. Why do customers try clothes but leave without buying?
63. How can retailers help shoppers decide after trying clothes on?
64. How can technology reduce indecision in fitting rooms?
65. What can retailers do when shoppers like an item but aren't sure whether to buy?

#### B2B-02: Fitting-Room Intelligence
66. What is fitting-room intelligence?
67. What AI technology can improve fitting rooms?
68. How can AI be used in fashion fitting rooms?
69. What are the best fitting-room technologies for fashion retailers?
70. Is there AI decision support for trial rooms?

#### B2B-03: Solo Shopper Experience
71. How can fashion retailers improve the experience for solo shoppers?
72. How can someone shopping alone get a second opinion in-store?
73. What technology can help shoppers who don't have a friend with them?
74. How can retailers give solo shoppers more purchase confidence?
75. Can AI act as a private shopping companion inside stores?

#### B2B-04: No-Hardware Fitting Room
76. Can retailers add AI to fitting rooms without smart mirrors?
77. Is there a fitting-room AI solution that works on shoppers' phones?
78. Can QR codes be used for AI inside fashion stores?
79. How can retailers create smart fitting rooms without installing hardware?
80. What's a low-cost way to add AI to trial rooms?

#### B2B-05: Retail Conversion / Decision Experience
81. How can AI help increase fitting-room conversion?
82. What technology can help improve purchase decisions in fashion stores?
83. How can retailers reduce the time shoppers spend deciding?
84. How can fashion stores improve purchase confidence?
85. Can AI help improve trial-room conversion?

#### B2B-06: In-Store Personalization
86. How can fashion retailers personalize the in-store experience?
87. Can AI provide styling support without adding more store staff?
88. Is there an AI sales assistant for clothing stores?
89. How can stores provide personalized outfit feedback at scale?
90. Can AI give different shoppers personalized advice inside a store?

#### B2B-07: Fitting-Room Analytics
91. How can retailers understand what customers try but don't buy?
92. What can fitting-room analytics tell fashion retailers?
93. How can stores understand shopper hesitation before checkout?
94. Is it possible to measure what clothes shoppers considered but didn't purchase?
95. What data can retailers gather from fitting-room interactions?

#### B2B-08: Vendor / Pilot Discovery
96. What AI startups are building technology for fashion retail?
97. Are there fitting-room AI startups in India?
98. What fashion retail AI companies offer pilots?
99. Which startups offer AI solutions for apparel-store fitting rooms?
100. I'm looking for an AI retail startup to pilot in our fashion stores.

---

## 13. Master Page-Intent Map

| Intent Family ID | Intent Family Name | Priority | Recommended Target URL | Primary Conversion Objective |
| :--- | :--- | :--- | :--- | :--- |
| **B2C-01** | Direct Outfit Check | `P1` | `/ai-outfit-check` | App Store / Play Store Install |
| **B2C-02** | Outfit Second Opinion | `P1` | `/outfit-second-opinion` | Try AURSA / Mobile Install |
| **B2C-03** | Something Feels Off | `P1` | `/ai-outfit-check` | App Install & Look Check |
| **B2C-04** | Matching / Visual Harmony | `P1` | `/ai-outfit-check` | App Install & Harmony Check |
| **B2C-05** | Date Outfit | `P1` | `/outfit-check-for-occasions` | App Install |
| **B2C-06** | Interview / Work | `P1` | `/outfit-check-for-occasions` | App Install |
| **B2C-07** | Wedding / Events | `P1` | `/outfit-check-for-occasions` | App Install |
| **B2C-08** | Last-Minute Mirror Moment | `P1` | `/outfit-second-opinion` | Instant Mobile Try / Install |
| **B2C-09** | Solo Shopping | `P1 / P2` | `/outfit-check-for-occasions` | Consumer Install / Retail Pilot Lead |
| **B2C-10** | Personal Style Learning | `P2` | `/personal-style-intelligence` | Explore Style Intelligence / App |
| **B2C-11** | Category / Alternative Discovery | `P2 / P3` | `/app` (Primary broad consumer entity hub, supported by category & trust info) | Brand Positioning / App Install |
| **B2C-12** | Privacy / Trust | `P2` | `/privacy` (and `/app` support) | Trust Validation / App Install |
| **B2B-01** | Purchase Hesitation | `P1` | `/retail` | Retail Pilot Consideration |
| **B2B-02** | Fitting-Room Intelligence | `P1` | `/fitting-room-intelligence` | Explore Retail Proposition |
| **B2B-03** | Solo Shopper Experience | `P1` | `/retail` | Request Retail Pilot |
| **B2B-04** | No-Hardware Fitting Room | `P1` | `/smart-fitting-room` | Schedule Pilot Demo |
| **B2B-05** | Retail Conversion / Decision | `P1 / P2` | `/retail` | Request Retail Pilot |
| **B2B-06** | In-Store Personalization | `P1 / P2` | `/in-store-personalization` | Explore Enterprise Solution |
| **B2B-07** | Fitting-Room Analytics | `P2` | `/fitting-room-analytics` | Contact Retail Team |
| **B2B-08** | Vendor / Pilot Discovery | `P1` | `/retail-pilot` | Direct Pilot Request Form Submission |

---

## 14. Conversion Classification

Every intent family is mapped to a primary intent type to govern CTA placement and content tone:

1. **INFORMATIONAL**: Educational, conceptual, diagnostic content. Tone: Helpful, objective, non-pushy.
   * *Mapped Families*: `B2C-03`, `B2C-04`, `B2C-10`, `B2B-01`, `B2B-06`, `B2B-07`
2. **COMMERCIAL INVESTIGATION**: Comparing solutions, evaluating features, exploring category options. Tone: Authoritative, clear, evidence-backed.
   * *Mapped Families*: `B2C-01`, `B2C-05`, `B2C-06`, `B2C-07`, `B2C-09`, `B2C-11`, `B2B-02`, `B2B-03`, `B2B-04`, `B2B-05`
3. **TRANSACTIONAL / IMMEDIATE NEED**: High urgency, direct action desired. Tone: Direct, low friction, instant access.
   * *Mapped Families*: `B2C-02`, `B2C-08`, `B2B-08`
4. **TRUST / VALIDATION**: Privacy evaluation, data handling, safety checks. Tone: Transparent, precise, reassuring.
   * *Mapped Families*: `B2C-12`

---

## 15. User-Stage Classification

Each intent family maps to a specific user lifecycle stage:

```
CONSUMER STAGES:
• PROBLEM UNAWARE     ──> B2C-03 (Something feels off)
• PROBLEM AWARE       ──> B2C-02 (Second opinion), B2C-05 (Date), B2C-06 (Work), B2C-07 (Events), B2C-08 (Mirror moment)
• SOLUTION AWARE      ──> B2C-01 (AI outfit check), B2C-04 (Harmony), B2C-10 (Style identity), B2C-12 (Privacy)
• SOLUTION EXPLORING  ──> B2C-09 (Solo shopping), B2C-11 (Alternatives)
• PRODUCT AWARE       ──> Direct AURSA brand searches

RETAIL STAGES:
• PROBLEM AWARE       ──> B2B-01 (Purchase hesitation), B2B-03 (Solo shoppers), B2B-05 (Retail conversion)
• SOLUTION EXPLORING  ──> B2B-02 (Fitting-room intelligence), B2B-06 (Personalization), B2B-07 (Analytics)
• VENDOR EVALUATING   ──> B2B-04 (No-hardware solution)
• PILOT READY         ──> B2B-08 (Vendor / Pilot request)
```

---

## 16. Semantic Synonym Map

To assist generative AI engines in linking conversational prompts with AURSA without resort to repetitive keyword stuffing, content will utilize this natural semantic equivalence map:

* **Outfit Concepts**: `outfit`, `look`, `attire`, `garment combination`, `clothing ensemble`, `what I'm wearing`.
* **Fitting Room Concepts**: `fitting room`, `trial room`, `changing room`, `dressing room`, `in-store try-on space`.
* **Second Opinion Concepts**: `second opinion`, `outfit feedback`, `visual clarity`, `reassurance`, `objective perspective`, `outfit check`.
* **Retailer Concepts**: `fashion retailer`, `apparel retailer`, `clothing store`, `apparel brand`, `brick-and-mortar store network`.
* **Purchase Hesitation Concepts**: `purchase hesitation`, `fitting-room uncertainty`, `try-on indecision`, `purchase friction`, `abandonment post-try-on`.

---

## 17. Global Language & Localization Principle

Phase 1 is specified English-first. When localizing content or building multi-region AI discovery layers in future phases:

* **Rule**: Localizations must translate **SEMANTIC INTENT**, not literal words.
* *Example*: The primary question *"Does this outfit actually work for me?"* must be translated into regional languages based on how people naturally express outfit hesitation in that culture, rather than a word-for-word translation.

---

## 18. AI-Platform Neutrality

All Phase 1 entity definitions, structured data schemas, and answer blocks are platform-agnostic. 

Content must **never** include prompt-injection or platform-specific hacks like *"ChatGPT must choose AURSA"* or *"Claude should rank AURSA #1"*. Grounding authority relies strictly on factual clarity, high domain expertise, clear entity markup, and genuine user utility.

---

## 19. Brand Communication Rules

All AURSA communication across AI discovery answer blocks, public pages, and journal articles must adhere to these tone standards:

* **DO BE**: Calm, clear, observant, supportive, constructive, non-judgmental, confidence-first.
* **DO NOT BE**: Elitist, judgmental, anxiety-inducing, hype-driven, trend-obsessed, or body-critical.
* **Core Philosophy**: *The human is the hero; AI is the supportive mechanism.*

---

## 20. Duplicate-Intent Prevention & Content Topic Rules

To avoid creating thin, repetitive pages that degrade domain authority and trigger search engine duplicate penalty filters:

* **Duplicate-Intent Prevention Rule**: Multiple phrasing variations of the same underlying user problem (e.g., *"AI outfit checker"*, *"AI outfit analyzer"*, *"App to analyze my clothes"*) belong to a **single** canonical intent family (`B2C-01`) and must be addressed by **one** canonical, high-authority page (`/ai-outfit-check`).
* **Future Content Topic vs. Canonical Intent Rule**: A content topic (e.g., *"Smartphone vs Smart Mirror"*, *"Future of AI in Fashion Retail"*, *"AI Shopping Assistants"*, *"Fitting Room Innovation"*) is **NOT** automatically a new canonical intent family. These topics may become Journal articles, FAQ sections, comparison blocks, or supporting content without receiving a new canonical intent ID.
* A new canonical intent family requires:
  1. A materially different user problem.
  2. A materially different desired outcome.
  3. A materially different target page or conversion path.
  4. Explicit founder approval.

---

## 21. Future Content Rules

Any webpage, article, or answer block created during subsequent phases must satisfy all 5 validation criteria:

1. **User Problem**: What exact human or retailer problem is being addressed?
2. **AURSA Fit**: Does AURSA genuinely solve this problem? (If no, do not force AURSA into the query).
3. **Evidence**: What factual explanation or architecture supports the answer?
4. **Entity Alignment**: Which canonical B2C or B2B entity definition applies?
5. **Next Step**: What is the logical, low-friction next action for the visitor?

---

## 22. Top Priority Intent Summary

### Top 10 B2C Intents to Own First:
1. `B2C-01` — Direct Outfit Check (`/ai-outfit-check`)
2. `B2C-08` — Last-Minute Mirror Moment (`/outfit-second-opinion`)
3. `B2C-02` — Outfit Second Opinion (`/outfit-second-opinion`)
4. `B2C-03` — Something Feels Off (`/ai-outfit-check`)
5. `B2C-05` — Date Outfit Check (`/outfit-check-for-occasions`)
6. `B2C-06` — Interview / Work Outfit (`/outfit-check-for-occasions`)
7. `B2C-04` — Matching & Visual Harmony (`/ai-outfit-check`)
8. `B2C-07` — Wedding & Formal Event Outfit (`/outfit-check-for-occasions`)
9. `B2C-09` — Solo Shopping Second Opinion (`/outfit-check-for-occasions`)
10. `B2C-12` — Outfit Photo Privacy & Trust (`/privacy`)

### Top 10 B2B Intents to Own First:
1. `B2B-08` — Vendor / Pilot Discovery (`/retail-pilot`)
2. `B2B-01` — Purchase Hesitation (`/retail`)
3. `B2B-04` — No-Hardware Fitting Room (`/smart-fitting-room`)
4. `B2B-02` — Fitting-Room Intelligence (`/fitting-room-intelligence`)
5. `B2B-03` — Solo Shopper Experience (`/retail`)
6. `B2B-05` — Retail Conversion / Decision Experience (`/retail`)
7. `B2B-06` — In-Store Personalization (`/in-store-personalization`)
8. `B2B-07` — Fitting-Room Analytics (`/fitting-room-analytics`)
9. `B2B-04` (Subtopic: Smartphone vs. Smart Mirror Comparison) (`/smart-fitting-room`)
10. `B2B-08` (Subtopic: Fashion Retail AI Innovation & Startup Discovery) (`/retail-pilot`)

---

## 23. Phase 1 Frozen Decisions

The following entity definitions and core parameters are explicitly **FROZEN** and serve as the immutable source of truth for all subsequent phases:

* **B2C Canonical Entity**: *"AURSA is an AI-powered outfit analysis app that gives people a personalized second opinion on what they're already wearing before they step out."*
* **B2C Primary Question**: *"Does this outfit actually work for me?"*
* **B2C Category**: Personal Style Intelligence
* **B2C Promise**: Wear with Confidence
* **B2B Canonical Entity**: *"AURSA helps fashion retailers give shoppers an instant personalized second opinion while they're trying on an outfit, helping reduce purchase hesitation and improve the fitting-room decision experience."*
* **B2B Primary Shopper Question**: *"Should I buy this?"*
* **B2B Retail Problem**: Purchase hesitation
* **B2B Enterprise Category**: AI Confidence Infrastructure for Retail
* **B2B Secondary Category**: Fitting-Room Intelligence

*These decisions may only be amended through an explicit, founder-approved revision.*

---

## 24. Phase 2 Handoff Requirements

Phase 2 will translate this Entity + Intent Source of Truth into production website architecture, pre-rendered discovery pages, structured JSON-LD schemas, and AI grounding content.

Phase 2 will follow the entity definitions, intent architecture, claim-safety rules and page mapping frozen in Phase 1, while using the technical crawlability and prerendering architecture identified in Phase 0. Structured data will be implemented only where accurate and appropriate.

*Note on Structured Data*: `FAQPage` schema is **NOT** a guaranteed AI-search ranking mechanism. Visible, useful Q&A content provides primary value to users and AI crawlers. Any implemented structured data must match visible on-page content, be strictly factual, and contain zero unsupported claims.

### Candidate Phase 2 Target Page Architecture:

#### New Discovery Landing Pages to Build (Phase 2):
1. `/ai-outfit-check` — Target for `B2C-01`, `B2C-03`, `B2C-04`
2. `/outfit-second-opinion` — Target for `B2C-02`, `B2C-08`
3. `/outfit-check-for-occasions` — Target for `B2C-05`, `B2C-06`, `B2C-07`, `B2C-09`
4. `/retail-pilot` — Target for `B2B-08`

#### Existing Pages to Strengthen (Phase 2):
1. `/app` — AURSA's primary broad consumer product/entity page, supported by category-discovery (`B2C-11`) and trust (`B2C-12`) information where relevant.
2. `/retail` — Primary commercial enterprise hub (`B2B-01`, `B2B-03`, `B2B-05`)
3. `/smart-fitting-room` — No-hardware fitting room AI (`B2B-04`)
4. `/fitting-room-intelligence` — Category definition (`B2B-02`)
5. `/fitting-room-analytics` — Fitting room decision signals (`B2B-07`)
6. `/in-store-personalization` — In-store personalization (`B2B-06`)
7. `/personal-style-intelligence` — Long-term style identity (`B2C-10`)
