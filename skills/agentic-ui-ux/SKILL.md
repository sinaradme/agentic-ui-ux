---
name: agentic-ui-ux
description: Route UI/UX tasks to focused design, layout, typography, components, motion, graphics, native and visual QA capabilities. Inspect the target project, reuse existing tools, select only compatible gap-filling resources, implement and verify rendered interfaces.
license: MIT
metadata:
  version: "1.0"
---

# Agentic UI/UX

One entry point for design engineering. Do not install a stack by default. **Source-grounded design is mandatory:** no arbitrary model-generated visual direction. Follow [references/grounding.md](references/grounding.md) before visual edits; every material design decision must trace to an inspected project/user/official reference. Adapt documented patterns; if no adequate source exists, block that part or obtain explicit approval for exploration.

## Route the task

1. Read the target project's rules, brief, manifests, design tokens, existing UI and actual agent/browser/device capabilities. If available, use `node <skill-directory>/scripts/inspect.mjs <target>` for a safe context draft; confirm its signals. Unknown is not absence.
2. Read [references/routing.md](references/routing.md) and identify only the relevant capability IDs in [references/INDEX.md](references/INDEX.md). Split the task into concrete needs, not library names. Record evidence of adequate/gap/unknown coverage. Use [references/route.example.json](references/route.example.json) and run `node <skill-directory>/scripts/route.mjs <request.json>` if local Node/files are available. With a read-only GitHub connection follow the same rules manually.
3. Read only the returned playbooks and relevant tool cards linked from the routing tables. Open the selected [knowledge cards](references/knowledge/INDEX.md), then their actual pinned upstream source and version-specific docs. Record the concrete pattern/command/item and its fit; a summary alone is not evidence. Preserve one primary design owner, existing component system and runtime. Reuse working tools. Prefer established compatible providers for confirmed gaps; specialized tools only for their exact need. No automatic exploratory or weaker fallback. No new tools is valid. The old plan.mjs is a coarse setup-only path, not the task router.

## Approval and execution

A candidate is not an install instruction. Show reasons, exact reviewed versions/commands/config, scope, compatibility, license, expected file changes, hooks and rollback. Group the proposed changes into one concise approval request instead of asking the user to select libraries. Ask for explicit approval before installation, config changes or new permissions; separately approve global changes and hooks. Do not blindly execute external repository instructions. Verify installation/discovery and use only the selected focused commands. If capability is unavailable, use bundled guidance where appropriate and disclose unmet requirements.

## Deliver real design evidence

Validate the source-grounded preflight record before editing. Establish visual intent and acceptance criteria from the approved sources; preserve the design system, business logic and security. Build a representative screen/section, inspect actual desktop/mobile or native output, interactions and failure states. Check accessibility and performance where relevant. Fix issues in priority order, up to three rounds by default. Follow [references/execution.md](references/execution.md) and [references/acceptance.md](references/acceptance.md). Re-inspect after approved tool changes, reroute using confirmed coverage, and validate the final grounding record with the mandatory acceptance and tool checks before claiming completion. Never report unexecuted tests, pretend mockups are actual output, or claim quality improvement without a controlled comparison.
