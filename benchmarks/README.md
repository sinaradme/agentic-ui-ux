# Evaluation protocol

[Home](../README.md) · [Tools](../TOOLS.md)

**Status: not started.** No independent screenshots, measured speedups, scores or winners are claimed in v1.0. Upstream demonstrations are not independent benchmark evidence.

## Research question

Does the orchestration skill reduce the user's tool-selection burden without degrading usable interface quality, compared with both a baseline and an expert-selected toolchain under comparable conditions?

## Experiment design

Use a fresh, identical starter repository for each run. Keep the model/version, agent/version, brief, assets, framework, dependencies, token/tool budgets, allowed browser access and number of refinement rounds constant. Record exact skill revisions and configuration. Separate initial-generation results from post-review results.

Test conditions:
- A: baseline, no added design skill.
- B: expert selects the appropriate primary and specialist tools manually.
- C: user installs only agentic-ui-ux; agent routes the same task and proposes tools.
- D (optional): individual upstream skill comparison, separately labeled.

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

## User effort and quality acceptance

Predeclare the acceptable non-inferiority margin on the 100-point rubric before seeing results (proposed pilot: 5 points, subject to reviewer agreement). Compare paired runs within the same brief, model and framework. A critical regression fails acceptance regardless of score. For each run log the number of manual tool-selection decisions, approval requests, clarification turns, direct edits, active user minutes, total elapsed time, new dependencies, and failed/blocked checks. Report median and spread; do not claim statistically established non-inferiority from a small pilot. Distinguish fewer tool decisions from fewer total minutes. Test a new web landing page, an existing dashboard redesign, a focused motion/gesture task, and a native task as separate cohorts. Use blind review where possible. Publish failures as well as successes.

## Run record

Copy [the run template](run-template.md). Store only original or appropriately licensed screenshots and assets. Use anonymized/mock data. Report unsuccessful runs and missing evidence, not just attractive outputs.

## Results

No comparative runs published yet. Proposed tools are not ranked by measured quality.
