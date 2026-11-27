# Evaluation protocol

[Home](../README.md) · [Tools](../TOOLS.md)

**Status: not started.** No screenshots, measured speedups, scores or winners are claimed in v0.1. Upstream demonstrations are not independent benchmark evidence.

## Research question

Does a design skill improve usable interface quality relative to a baseline, under comparable conditions, and how much extra work does it require?

## Experiment design

Use a fresh, identical starter repository for each run. Keep the model/version, agent/version, brief, assets, framework, dependencies, token/tool budgets, allowed browser access and number of refinement rounds constant. Record exact skill revisions and configuration. Separate initial-generation results from post-review results.

Test cases:
- A: baseline, no added design skill.
- B: one primary skill (e.g. Taste Skill).
- C: alternative primary skill (e.g. Impeccable for a redesign, or another art-direction skill for a new page).
- D: only if justified, best single-skill workflow plus one targeted complementary skill.

Use at least two briefs (landing page and existing app/dashboard improvement) and ideally three runs per condition. Randomize run order. For native stacks, use separate comparable cohorts. Do not compare a fully equipped browser workflow against a baseline without browser access unless measuring the entire workflow and labeling it accordingly.

## Rubric (proposed)

Rate each dimension 0–5 with evidence. Weighted score = sum of (rating / 5 × weight).

| Dimension | Weight | Evidence |
| --- | ---: | --- |
| Visual hierarchy and coherence | 25 | Blind screenshot review |
| Distinctiveness and fit to brief | 15 | Independent review against brief |
| UX and functional behavior | 20 | Task scenarios and tests |
| Responsiveness and accessibility | 20 | Device/viewport and accessibility checks |
| Interaction quality and performance | 10 | Recorded interaction, relevant timing checks |
| Maintainability | 10 | Code review, reuse, dependency changes |

Report raw ratings, reviewer disagreement, critical failures, time, tool calls, tokens if available, number of manual edits and additional dependencies separately. A broken critical flow or serious accessibility defect prevents recommending the result regardless of visual score. Subjective ratings are not objective ground truth.

## Run record

Copy [the run template](run-template.md). Store only original or appropriately licensed screenshots and assets. Use anonymized/mock data. Report unsuccessful runs and missing evidence, not just attractive outputs.

## Results

No comparative runs published yet. Proposed tools are not ranked by measured quality.
