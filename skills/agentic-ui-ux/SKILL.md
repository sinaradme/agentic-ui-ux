---
name: agentic-ui-ux
description: Guide framework-aware UI/UX design, frontend implementation and rendered visual QA. Use for landing pages, product interfaces, dashboards, redesigns, motion and native mobile work.
---

# Agentic UI/UX

A lightweight orchestration skill. It does not bundle third-party skills, install dependencies, or promise design quality.

## Workflow

1. Read the user's brief and inspect the actual project. Identify the framework, existing design system, constraints and target platforms. Respect existing project rules.
2. Identify the bottleneck: new visual direction, UX planning, existing interface polish, motion or visual verification.
3. Use one already-installed primary design skill if relevant. If none is installed, proceed with these instructions or recommend a specific optional skill. Do not install or run third-party scripts without appropriate user authorization.
4. Use the existing component library and tokens first. For native apps use native components and motion mechanisms; do not import browser-only primitives.
5. Establish a coherent visual direction and implement a small working screen or section. Preserve business logic, security boundaries and existing behavior.
6. Render on relevant viewports/devices. Inspect actual screenshots and important states; use available browser/device tools. If tools are unavailable, explicitly report the limitation.
7. Fix material defects and repeat within the agreed scope. Record build/tests, visual evidence, dependencies changed and unresolved issues.

## Tool selection hints

- New web design: Taste Skill is a starting candidate.
- Existing web UI: Impeccable is a starting candidate.
- Design-system/UX planning: UI/UX Pro Max is a starting candidate.
- Motion-specific gap: consider Emil's skills (animate for web, animate-expo for React Native/Expo).
- Native: use framework-compatible tools and device testing.
- Visual feedback: use existing browser automation or Playwright for web.

These are editorial hypotheses, not benchmark winners. Consult the repository's [tool catalog](../../TOOLS.md), [workflow guide](../../WORKFLOWS.md) and [mobile guide](../../MOBILE.md) if available; this skill's essential instructions are self-contained.

## Final report

State the design direction, implemented scope, selected skill (if any), actual evidence, and remaining gaps. Never label an unexecuted test or inspection as passed. Do not claim production readiness without sufficient verification.
