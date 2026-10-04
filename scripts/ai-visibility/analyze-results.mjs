import fs from 'fs';
import path from 'path';

/**
 * AURSA AI Visibility Lab — Results Analysis Script
 * Reads results CSV, computes visibility metrics across platforms and intent families,
 * and generates docs/ai-discovery/phase-5/reports/baseline-summary.md.
 */

const inputCsvPath = path.resolve('docs/ai-discovery/phase-5/results.csv');
const templateCsvPath = path.resolve('docs/ai-discovery/phase-5/results-template.csv');
const reportOutputPath = path.resolve('docs/ai-discovery/phase-5/reports/baseline-summary.md');

function parseCsv(content) {
    const lines = content.trim().split(/\r?\n/);
    if (lines.length <= 1) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        // Simple CSV splitter handling quoted values
        const values = [];
        let inQuotes = false;
        let currentValue = '';
        for (const char of lines[i]) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());

        const row = {};
        headers.forEach((h, idx) => {
            row[h] = values[idx] || '';
        });
        rows.push(row);
    }
    return rows;
}

function analyze() {
    let targetFile = fs.existsSync(inputCsvPath) ? inputCsvPath : templateCsvPath;
    console.log(`[AI Visibility Lab] Reading input from: ${targetFile}`);

    const rawContent = fs.readFileSync(targetFile, 'utf8');
    const rows = parseCsv(rawContent);

    const totalRuns = rows.length;
    console.log(`[AI Visibility Lab] Total observation runs found: ${totalRuns}`);

    // If template or empty, produce baseline ready state report
    if (totalRuns === 0) {
        const templateReport = `# AURSA AI VISIBILITY LAB — BASELINE SUMMARY REPORT

**Status**: PHASE 5 LAB READY — CALIBRATION PENDING  
**Date**: ${new Date().toISOString().split('T')[0]}  
**Total Observations Recorded**: 0 / 300  

---

## Executive Summary
The AURSA AI Visibility Lab infrastructure has been successfully initialized with 100 canonical Phase-1 benchmark prompts across 12 B2C and 8 B2B intent families.

No observations have been recorded yet. 

### Next Steps:
1. Run Phase A Rubric Calibration (30 observations across ChatGPT, Claude, and Gemini).
2. Execute full 300-observation benchmark run.
3. Re-run \`node scripts/ai-visibility/analyze-results.mjs\` to populate visibility metrics.
`;
        fs.mkdirSync(path.dirname(reportOutputPath), { recursive: true });
        fs.writeFileSync(reportOutputPath, templateReport, 'utf8');
        console.log(`[AI Visibility Lab] Created baseline summary template at: ${reportOutputPath}`);
        return;
    }

    // Process filled rows
    const calcRate = (num, den) => den > 0 ? ((num / den) * 100).toFixed(1) + '%' : '0.0%';

    const platforms = ['ChatGPT', 'Claude', 'Gemini'];
    const segments = ['B2C', 'B2B'];

    const getStats = (subset) => {
        const count = subset.length;
        if (count === 0) return { count: 0, mentions: 0, citations: 0, recommendations: 0, primary: 0, exactMatches: 0, accurate: 0 };

        const mentions = subset.filter(r => (r.aursa_mentioned || '').toUpperCase() === 'YES').length;
        const citations = subset.filter(r => (r.aursa_cited || '').toUpperCase() === 'YES').length;
        const recommendations = subset.filter(r => (r.aursa_recommended || '').toUpperCase() === 'YES').length;
        const primary = subset.filter(r => (r.aursa_primary_recommendation || '').toUpperCase() === 'YES').length;
        const exactMatches = subset.filter(r => ['EXACT_TARGET', 'RELEVANT_ALTERNATIVE'].includes((r.aursa_page_match || '').toUpperCase())).length;
        const accurate = subset.filter(r => (r.aursa_entity_accuracy || '').toUpperCase() === 'ACCURATE').length;

        return {
            count,
            mentions,
            mentionRate: calcRate(mentions, count),
            citations,
            citationRate: calcRate(citations, count),
            recommendations,
            recommendationRate: calcRate(recommendations, count),
            primary,
            primaryRate: calcRate(primary, count),
            exactMatches,
            correctPageRate: calcRate(exactMatches, citations),
            accurate,
            accuracyRate: calcRate(accurate, mentions)
        };
    };

    const overall = getStats(rows);

    let reportMarkdown = `# AURSA AI VISIBILITY LAB — BASELINE SUMMARY REPORT

**Status**: ${totalRuns >= 300 ? 'PHASE 5 BASELINE COMPLETE — GAP ANALYSIS PENDING' : (totalRuns >= 30 ? 'PHASE 5 RUBRIC CALIBRATED — BASELINE IN PROGRESS' : 'PHASE 5 LAB READY — CALIBRATION IN PROGRESS')}  
**Date**: ${new Date().toISOString().split('T')[0]}  
**Total Observations Recorded**: ${totalRuns} / 300  

---

## 1. Overall Visibility Metrics

| Metric | Total Count | Rate |
| :--- | :---: | :---: |
| **Total Benchmark Runs** | ${overall.count} | 100.0% |
| **AURSA Mention Rate** | ${overall.mentions} | ${overall.mentionRate} |
| **AURSA Citation Rate** | ${overall.citations} | ${overall.citationRate} |
| **AURSA Recommendation Rate** | ${overall.recommendations} | ${overall.recommendationRate} |
| **Primary Recommendation Rate** | ${overall.primary} | ${overall.primaryRate} |
| **Correct Page Citation Rate** | ${overall.exactMatches} | ${overall.correctPageRate} |
| **Entity Accuracy Rate** | ${overall.accurate} | ${overall.accuracyRate} |

---

## 2. Platform Comparison

| Platform | Runs | Mention Rate | Citation Rate | Rec. Rate | Primary Rec. Rate |
| :--- | :---: | :---: | :---: | :---: | :---: |
`;

    platforms.forEach(p => {
        const subset = rows.filter(r => (r.platform || '').toLowerCase() === p.toLowerCase());
        const s = getStats(subset);
        reportMarkdown += `| **${p}** | ${s.count} | ${s.mentionRate} | ${s.citationRate} | ${s.recommendationRate} | ${s.primaryRate} |\n`;
    });

    reportMarkdown += `\n---\n\n## 3. Segment Breakdown (B2C vs B2B)\n\n| Segment | Runs | Mention Rate | Citation Rate | Rec. Rate | Primary Rec. Rate |\n| :--- | :---: | :---: | :---: | :---: | :---: |\n`;

    segments.forEach(seg => {
        const subset = rows.filter(r => (r.segment || '').toUpperCase() === seg);
        const s = getStats(subset);
        reportMarkdown += `| **${seg}** | ${s.count} | ${s.mentionRate} | ${s.citationRate} | ${s.recommendationRate} | ${s.primaryRate} |\n`;
    });

    reportMarkdown += `\n---\n\n## 4. Intent Family Coverage\n\n| Family ID | Family Name | Segment | Runs | Mentions | Citations | Recommendations |\n| :--- | :--- | :---: | :---: | :---: | :---: | :---: |\n`;

    const families = [...new Set(rows.map(r => r.family_id))].filter(Boolean).sort();
    families.forEach(fId => {
        const subset = rows.filter(r => r.family_id === fId);
        const s = getStats(subset);
        const sampleName = subset[0] ? subset[0].family_name || fId : fId;
        const sampleSeg = subset[0] ? subset[0].segment || '' : '';
        reportMarkdown += `| **${fId}** | ${sampleName} | ${sampleSeg} | ${s.count} | ${s.mentions} | ${s.citations} | ${s.recommendations} |\n`;
    });

    reportMarkdown += `\n---\n\n*Report automatically generated by internal script \`scripts/ai-visibility/analyze-results.mjs\`.*\n`;

    fs.mkdirSync(path.dirname(reportOutputPath), { recursive: true });
    fs.writeFileSync(reportOutputPath, reportMarkdown, 'utf8');
    console.log(`[AI Visibility Lab] Successfully wrote report to: ${reportOutputPath}`);
}

analyze();
