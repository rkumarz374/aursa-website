# SCORING RUBRIC — AURSA AI VISIBILITY LAB

This document defines the unalterable rules for evaluating AI assistant responses collected during Phase 5 visibility benchmarks.

---

## 1. OBSERVATION FIELDS & DEFINITIONS

### 1. SEARCH OBSERVATION (`searched`)
- `YES`: Visible proof of external web search / browser retrieval (e.g. search icon, web search step, inline URL links, web citations displayed).
- `NO`: Assistant generated response strictly from internal pre-trained weights without visible web search activity.
- `UNKNOWN`: Invisible or unconfirmable retrieval state.

### 2. AURSA MENTION (`aursa_mentioned`)
- `YES`: AURSA is explicitly named in the prose response (including minor spelling variations like "Aursa" or "AURSA App").
- `NO`: AURSA is not mentioned at all.

### 3. AURSA CITATION (`aursa_cited`)
- `YES`: Response visibly references an explicit web source attributable to AURSA (e.g. `aursa.app`, official App Store/Play Store link, or linked article URL).
- `NO`: No clickable or visible URL citation to an official AURSA property exists.
- *Note*: Plain-text mentions without a URL citation are recorded as `aursa_mentioned = YES`, `aursa_cited = NO`.

### 4. CITED URL & PAGE MATCH (`aursa_page_match`)
- `aursa_cited_url`: The exact URL surfaced by the assistant (e.g., `https://aursa.app/ai-outfit-check`).
- `aursa_page_match` Values:
  - `EXACT_TARGET`: Cited URL matches the intent family's designated `target_aursa_page`.
  - `RELEVANT_ALTERNATIVE`: Cited URL is a relevant AURSA discovery page (e.g., `/app` or `/outfit-second-opinion` when target was `/ai-outfit-check`).
  - `HOMEPAGE_ONLY`: Assistant cited root `https://aursa.app` instead of a specific pillar page.
  - `WRONG_AURSA_PAGE`: Assistant cited an unrelated AURSA page (e.g., privacy policy for a date outfit query).
  - `NO_AURSA_CITATION`: AURSA was not cited.

### 5. AURSA RECOMMENDATION (`aursa_recommended`)
- `YES`: The assistant explicitly presents AURSA as a product/tool/app that the user can use for outfit feedback or decision support.
- `NO`: Passing reference without recommendation, or complete omission.

### 6. PRIMARY RECOMMENDATION & POSITION
- `aursa_primary_recommendation`: `YES` if AURSA is the #1 listed recommendation, the top-ranked option, or presented as the main direct solution. Otherwise `NO`.
- `aursa_position`: Integer position (1, 2, 3...) if the response outputs an explicit ordered list. Otherwise `N/A`.

### 7. ENTITY ACCURACY (`aursa_entity_accuracy`)
- `ACCURATE`: Understands AURSA as an AI outfit analysis app providing personalized second opinions on worn outfits (B2C) or fitting-room decision support reducing purchase hesitation (B2B).
- `PARTIAL`: Correctly identifies AURSA as fashion AI but misses core "worn outfit / second opinion" positioning.
- `INCORRECT`: Severe misclassification.

### 8. ENTITY CONFUSION FLAGS (`entity_confusion_flag`)
Flag if AURSA is misdescribed as:
- `SHOPPING_MARKETPLACE` (e-commerce store)
- `WARDROBE_ORGANIZER` (closet inventory manager)
- `VIRTUAL_TRY_ON` (3D avatar garment superimposition)
- `GENERIC_AI_STYLIST` (trend discovery engine pushing fast fashion)
- `SOCIAL_OUTFIT_RATING` (public voting / attractiveness scoring)
- `SMART_MIRROR_VENDOR` (hardware mirror manufacturer)

---

## 2. WINNER REASON CODES (`winner_reason_code`)

When a competitor is recommended over AURSA, assign exactly one observable reason code:

1. `AURSA_NOT_RETRIEVED`: Assistant web search did not find or retrieve AURSA pages.
2. `AURSA_RETRIEVED_NOT_RECOMMENDED`: Search retrieved AURSA content, but assistant omitted it from final list.
3. `COMPETITOR_EXACT_INTENT_SOURCE`: Competitor has a dedicated page matching the user's exact keyword string.
4. `COMPETITOR_THIRD_PARTY_SOURCE`: Third-party review sites (Reddit, TechCrunch, listicle blogs) recommended competitor.
5. `COMPETITOR_STORE_LISTING`: Competitor App Store / Play Store listing dominated search results.
6. `COMPETITOR_MORE_PROMINENT_IN_RESPONSE`: Assistant listed competitor higher due to legacy popularity.
7. `AURSA_CATEGORY_MISUNDERSTOOD`: Assistant classified prompt into a category AURSA doesn't serve (e.g., 3D try-on).
8. `AURSA_PAGE_NOT_CITED`: Assistant knew of AURSA but couldn't verify an active URL.
9. `ANSWER_DID_NOT_RECOMMEND_PRODUCTS`: Assistant gave generic fashion advice without recommending specific tools.
10. `NO_CLEAR_WINNER`: Informational answer with equal neutral mentions.
11. `UNKNOWN`: Unobservable reason.

---

## 3. CORE METRICS FORMULAS

- **Mention Rate**: `(Prompts where aursa_mentioned = YES) / (Total Prompts)`
- **Citation Rate**: `(Prompts where aursa_cited = YES) / (Total Prompts)`
- **Recommendation Rate**: `(Prompts where aursa_recommended = YES) / (Total Prompts)`
- **Primary Recommendation Rate**: `(Prompts where aursa_primary_recommendation = YES) / (Total Prompts)`
- **Correct Page Citation Rate**: `(Prompts where aursa_page_match IN [EXACT_TARGET, RELEVANT_ALTERNATIVE]) / (Prompts where aursa_cited = YES)`
- **Entity Accuracy Rate**: `(Prompts where aursa_entity_accuracy = ACCURATE) / (Prompts where aursa_mentioned = YES)`
