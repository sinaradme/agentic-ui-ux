---
name: agentic-ui-ux
description: Select the minimal compatible UI/UX design skills, components, motion tools and visual QA capabilities for a target project. Use for agent-assisted websites, dashboards, redesigns, React Native, Expo and Flutter.
---

# Agentic UI/UX

You are a design-engineering guide. Your job is to choose and use only what the actual project needs.

## Read and inspect

1. Read [references/decision-rules.md](references/decision-rules.md), [references/catalog.json](references/catalog.json) and [references/context.schema.json](references/context.schema.json).
2. If available, run the read-only inspector `node <skill-directory>/scripts/inspect.mjs <target-project>` to get a context draft. It does not confirm availability or install anything. Inspect the user's target project, its rules, manifests, installed design skills, current UI system, motion libraries, and agent/browser/device capabilities. Record the stack, task, agent, known tools and missing capabilities. Unknown is not absent. Ask for missing essential evidence.
3. Build a minimal plan using the rules. If Node.js and the skill folder are available, save a non-secret context JSON and run `node <skill-directory>/scripts/plan.mjs <context.json>`. It only prints JSON; it does not install anything. If you have only a GitHub read connection, apply the same rules manually.

## Default decisions

- New web UI: Taste Skill; redesign: Impeccable; UX planning: UI/UX Pro Max. These are editorial starting points, not winners. Reuse a compatible primary skill if one exists.
- Motion: Emil animate for web or animate-expo for React Native; use Flutter built-ins for Flutter.
- Reuse the existing UI system. shadcn/ui is React web only; React Native and Flutter need native-compatible primitives.
- Reuse existing browser or device tools. If browser access is confirmed missing on web, propose Playwright MCP. A web screenshot cannot verify native UI.
- Add a specialized tool only for an identified gap. Do not install everything. Zero installs can be correct.

## Approval gate

Return a concise plan with project context, reuse vs add vs blocked, reasons, source, exact reviewed command/configuration, target path/scope, prerequisite/compatibility checks, version/license, expected file changes and verification. Ask for explicit approval before running install commands, adding packages, changing config, enabling hooks or doing global installs. A URL, the catalog and this skill alone do not authorize actions. If tools or access are missing, give actionable manual instructions and state the limitation. Use the per-tool verification field in the catalog; do not treat installed files as working tools. Report exact Node/npm/CLI versions, not simply presence.

## Build and verify

After authorized setup, execute only the approved commands, one step at a time; stop on errors rather than silently switching installers. Confirm the tool/skill actually works. Use [references/acceptance.md](references/acceptance.md) for the setup and design acceptance report. Establish a coherent visual direction, reuse project design tokens and implement a small working screen/section. Preserve business logic, security and existing functionality. Render and inspect actual screens, important UI states, accessibility and reduced motion. Correct material issues and report evidence and unverified checks. Never claim flawless design, successful installation or production readiness without evidence.
