# BASELINE PROTOCOL — AURSA AI VISIBILITY LAB

This document specifies the execution protocol for gathering clean, un-contaminated AI assistant responses across ChatGPT, Claude, and Gemini.

---

## 1. CLEAN-SESSION PRINCIPLE

To measure true organic discovery, benchmark sessions must mirror the experience of a new user who has never discussed AURSA.

### Environment Constraints:
1. **NO AURSA CONTEXT**: Do not use chat accounts, project workspaces, custom GPTs, or saved memories that contain previous references to AURSA, `aursa.app`, or internal repository details.
2. **ONE PROMPT = ONE NEW CHAT**: Every single benchmark prompt must be executed in a freshly opened conversation window or incognito session. Never execute sequential prompts in the same chat session.
3. **DO NOT MENTION AURSA IN THE PROMPT**: Submit the canonical prompt string *exactly* as defined in `benchmark-prompts.csv`. Do not append "Have you heard of AURSA?" or "Include aursa.app".
4. **NATURAL DEFAULT BEHAVIOR**: Use the assistant's standard consumer web interface without forcing deep research modes unless the prompt naturally triggers web retrieval.

---

## 2. METADATA LOGGING

For each test run, record:
- `test_date`: YYYY-MM-DD timestamp.
- `platform`: `ChatGPT`, `Claude`, or `Gemini`.
- `model_or_mode`: Visible UI model label (e.g. `GPT-4o`, `Claude 3.5 Sonnet`, `Gemini 1.5 Pro`). If invisible, record `UNKNOWN`.
- `language`: `English`.
- `region`: Recorded test region (e.g. `US`, `Global`).

---

## 3. EXECUTION PHASES

### Phase A: Rubric Calibration (30 Observations)
1. Select 10 representative prompts (5 B2C, 5 B2B):
   - `B2C-01-01` (Direct Outfit Check)
   - `B2C-02-01` (Outfit Second Opinion)
   - `B2C-05-01` (Date Outfit)
   - `B2C-08-01` (Last-Minute Mirror Moment)
   - `B2C-11-01` (Category Discovery)
   - `B2B-01-01` (Purchase Hesitation)
   - `B2B-02-01` (Fitting-Room Intelligence)
   - `B2B-04-01` (No-Hardware Fitting Room)
   - `B2B-06-01` (In-Store Personalization)
   - `B2B-08-01` (Vendor / Pilot Discovery)
2. Run across all 3 platforms (ChatGPT, Claude, Gemini) = 30 initial observations.
3. Populate `results.csv` and verify scoring consistency.

### Phase B: Full Baseline (300 Observations)
1. Execute all 100 canonical prompts across 3 platforms = 300 total baseline observations.
2. Run `node scripts/ai-visibility/analyze-results.mjs` to calculate baseline metrics and generate the gap analysis report.
