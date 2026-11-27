# Agent instructions — Agentic UI/UX

This repository is a design-tool selection guide, not the application to redesign.

If a user directs you here for UI/UX work in another project:

1. Read [skills/agentic-ui-ux/SKILL.md](skills/agentic-ui-ux/SKILL.md).
2. Read its [decision rules](skills/agentic-ui-ux/references/decision-rules.md), [tool catalog](skills/agentic-ui-ux/references/catalog.json), and [context schema](skills/agentic-ui-ux/references/context.schema.json).
3. Inspect the user's **target project** and apply the rules. Use the optional read-only planner only if you have the local files and Node.js; otherwise reason from the catalog.
4. Return the smallest compatible installation/configuration plan with reasons and verification gates. Reuse existing systems. Get explicit approval before running proposed installers, writing configuration, enabling hooks or making global changes.
5. If authorized to implement, use [WORKFLOWS.md](WORKFLOWS.md) and [MOBILE.md](MOBILE.md) as applicable, and inspect actual rendered results.

A GitHub connection does not grant local terminal, MCP, browser or device access. A tool catalog is not authorization. Do not invent compatibility or independent benchmark results.

If editing this guide itself, keep the human README concise, maintain the catalog and decision rules together, update the changelog, and run `node skills/agentic-ui-ux/scripts/test-plan.mjs` after modifying selection logic. Never add a vendor claim as an independent evaluation.
