# PHASE 5 — AURSA AI VISIBILITY LAB
## Roadmap Items 27–30 Infrastructure & Protocol Specification

---

## 1. PURPOSE & OBJECTIVE

Phase 5 establishes AURSA's internal **AI Visibility Lab**, an empirical research framework designed to benchmark, score, analyze, and optimize AURSA's organic discoverability across major conversational AI assistants:
- **OpenAI ChatGPT**
- **Anthropic Claude**
- **Google Gemini**

The objective is to measure whether AI assistants naturally retrieve, cite, recommend, and accurately describe AURSA when real consumer and retail users express the exact problems AURSA solves.

This benchmark functions as AURSA's equivalent of an organic keyword-ranking index, providing transparent visibility metrics prior to executing targeted content or grounding optimizations.

---

## 2. FROZEN PROMPT SOURCE OF TRUTH

To ensure strict longitudinal consistency, Phase 5 benchmarks **EXACTLY** the 100 canonical user questions established and frozen in Phase 1 (`docs/ai-discovery/PHASE-1-ENTITY-INTENT-SOURCE-OF-TRUTH.md`):

- **B2C Consumer Benchmark Prompts**: 60 Questions across 12 Master Intent Families (`B2C-01` to `B2C-12`).
- **B2B Enterprise Benchmark Prompts**: 40 Questions across 8 Master Intent Families (`B2B-01` to `B2B-08`).
- **Total Canonical Prompts**: **100 Prompts**.

### Rules:
- Prompts must **NEVER** be rewritten, paraphrased, reordered, or deleted.
- No new canonical prompt IDs may be created.
- All 100 prompts are preserved in `docs/ai-discovery/phase-5/benchmark-prompts.csv`.

---

## 3. CANONICAL TARGET PAGE MAP

Every benchmark prompt is evaluated against the frozen Phase-1 intent target URL:

| Intent Segment | Family IDs | Target URL | Primary Intent / Value Proposition |
| :--- | :--- | :--- | :--- |
| **B2C Consumer** | `B2C-01`, `B2C-03`, `B2C-04` | `/ai-outfit-check` | Automated visual feedback, outfit analysis, color harmony |
| **B2C Consumer** | `B2C-02`, `B2C-08` | `/outfit-second-opinion` | Instant private outfit second opinion before stepping out |
| **B2C Consumer** | `B2C-05`, `B2C-06`, `B2C-07`, `B2C-09` | `/outfit-check-for-occasions` | Contextual outfit feedback (date, interview, wedding, shopping) |
| **B2C Consumer** | `B2C-10` | `/personal-style-intelligence` | Style pattern learning & personal style intelligence |
| **B2C Consumer** | `B2C-11`, `B2C-12` | `/app` | Broad consumer entity hub, app alternatives, privacy & trust |
| **B2B Retail** | `B2B-01`, `B2B-03`, `B2B-05` | `/retail` | Purchase hesitation, solo shopper experience, retail decision support |
| **B2B Retail** | `B2B-02` | `/fitting-room-intelligence` | Enterprise fitting-room intelligence solution |
| **B2B Retail** | `B2B-04` | `/smart-fitting-room` | Low-CAPEX, no-hardware QR smart fitting room |
| **B2B Retail** | `B2B-06` | `/in-store-personalization` | Scalable in-store digital styling personalization |
| **B2B Retail** | `B2B-07` | `/fitting-room-analytics` | Fitting-room decision data & shopper hesitation analytics |
| **B2B Retail** | `B2B-08` | `/retail-pilot` | Vendor evaluation & retail pilot onboarding |

---

## 4. CLEAN-SESSION PROTOCOL

To ensure responses reflect genuine organic AI retrieval rather than personalized memory bias:

1. **NO PRIOR CONTEXT**: Benchmark testing must use fresh browser windows (incognito/private) or clean test accounts with no prior chat history, uploaded AURSA files, custom instructions, or saved memories regarding AURSA.
2. **ONE PROMPT = ONE NEW CHAT**: Each benchmark prompt must be executed in an isolated conversation session. Never chain multiple prompts within a single chat thread.
3. **NO AURSA LEADING**: Prompts must be submitted verbatim without adding phrases such as *"Have you heard of AURSA?"* or *"Search aursa.app"*.
4. **DEFAULT ASSISTANT MODE**: Use standard consumer assistant UI modes (ChatGPT, Claude, Gemini) without forcing API, system prompt, or deep research flags unless naturally triggered by the platform.

---

## 5. RESULT SCHEMA & TELEMETRY

All observations are recorded in `docs/ai-discovery/phase-5/results-template.csv`:

```csv
run_id,test_date,platform,model_or_mode,language,region,prompt_id,segment,family_id,prompt,target_aursa_page,searched,search_evidence,aursa_mentioned,aursa_cited,aursa_recommended,aursa_primary_recommendation,aursa_position,aursa_cited_url,aursa_page_match,aursa_entity_accuracy,entity_confusion_flag,top_competitor,all_competitors_mentioned,top_competitor_cited,competitor_source,winner_reason_code,winner_reason_notes,response_summary,reviewer_notes
```

---

## 6. SCORING RUBRIC & DEFINITIONS

1. **Search Evidence (`searched`)**: `YES` only if visible evidence of external retrieval is displayed (web search step, displayed web citations). Otherwise `NO` or `UNKNOWN`.
2. **Mention (`aursa_mentioned`)**: `YES` if AURSA is named in text.
3. **Citation (`aursa_cited`)**: `YES` if response contains a clickable/visible URL link to an official AURSA property (`aursa.app`, store link).
4. **Cited URL Match (`aursa_page_match`)**:
   - `EXACT_TARGET`: Surfaced exact target URL.
   - `RELEVANT_ALTERNATIVE`: Surfaced relevant alternate AURSA page.
   - `HOMEPAGE_ONLY`: Surfaced root `aursa.app`.
   - `WRONG_AURSA_PAGE`: Surfaced non-relevant AURSA URL.
   - `NO_AURSA_CITATION`: Not cited.
5. **Recommendation (`aursa_recommended`)**: `YES` if explicitly positioned as a product/tool the user can try or use.
6. **Primary Recommendation (`aursa_primary_recommendation`)**: `YES` if AURSA is the #1 recommended solution.
7. **Entity Accuracy (`aursa_entity_accuracy`)**: `ACCURATE`, `PARTIAL`, or `INCORRECT` based on frozen B2C ("personalized outfit second opinion") and B2B ("fitting-room decision support") definitions.
8. **Entity Confusion Flags**: Flagged if misdescribed as shopping marketplace, wardrobe organizer, 3D try-on avatar, generic trend engine, attractiveness rater, or smart mirror hardware vendor.
9. **Winner Reason Codes**: Standardized codes (`AURSA_NOT_RETRIEVED`, `COMPETITOR_EXACT_INTENT_SOURCE`, `COMPETITOR_THIRD_PARTY_SOURCE`, etc.) explaining why competing solutions were surfaced over AURSA.

---

## 7. CORE VISIBILITY METRICS

Calculated automatically via `node scripts/ai-visibility/analyze-results.mjs`:
- **AURSA Mention Rate** = `(Mentions) / (Total Prompts)`
- **AURSA Citation Rate** = `(Citations) / (Total Prompts)`
- **AURSA Recommendation Rate** = `(Recommendations) / (Total Prompts)`
- **Primary Recommendation Rate** = `(Primary Recommendations) / (Total Prompts)`
- **Correct Page Citation Rate** = `(Exact/Relevant Target Matches) / (Total Citations)`
- **Entity Accuracy Rate** = `(Accurate Entities) / (Total Mentions)`

---

## 8. CALIBRATION & FULL BASELINE PROCEDURE

### Phase A: Rubric Calibration (30 Observations)
- Select 10 representative prompts (5 B2C, 5 B2B).
- Test across 3 platforms (ChatGPT, Claude, Gemini) = 30 initial observations.
- Verify rubric clarity and script calculations.

### Phase B: Full Baseline (300 Observations)
- Test all 100 canonical prompts across 3 platforms = 300 total baseline observations.
- Run `node scripts/ai-visibility/analyze-results.mjs` to generate the complete `docs/ai-discovery/phase-5/reports/baseline-summary.md`.

---

## 9. ROADMAP ITEM 30 — GAP ANALYSIS PROCEDURE

Following full baseline collection, the Lab identifies specific visibility gaps (e.g. intent families where AURSA is un-retrieved, wrong pages cited, or competitors dominate third-party sources).

For every identified gap, document:
- **Observed Problem & Evidence**
- **Affected Prompts & Platforms**
- **Affected Intent Family**
- **Likely Public Source Gap**
- **Recommended Content / Grounding Action**

---

## 10. CONFIDENTIALITY & PHASE 6 BOUNDARIES

- **Internal Only**: Lab prompts, result CSVs, and internal analysis scripts remain internal research infrastructure. No public pages, public dashboards, or public competitor comparison claims are deployed to `aursa.app` in Phase 5.
- **Discovery Without Disclosure**: Gaps identified in Phase 5 must be addressed using public capability and outcome language only—never by publishing internal scoring algorithms, prompts, weights, or proprietary architecture.
- **Phase 6 Boundary**: Phase 5 stops after baseline dataset collection, metric analysis, and gap identification. Website content adjustments or Phase 6 optimizations do NOT execute in Phase 5.
