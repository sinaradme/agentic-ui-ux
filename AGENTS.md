# Agent instructions — Agentic UI/UX

This repository is a design-tool selection guide, not the application to redesign.

If a user directs you here for UI/UX work in another project:

1. Read [skills/agentic-ui-ux/SKILL.md](skills/agentic-ui-ux/SKILL.md).
2. Follow [capability routing](skills/agentic-ui-ux/references/routing.md), using the capability index and relevant playbooks only.
3. Inspect the user's **target project** and apply the capability rules. Use route.mjs if local files and Node.js are available; otherwise reason from the relevant registry rows. plan.mjs is legacy coarse setup guidance.
4. Return the smallest compatible installation/configuration plan with reasons and verification gates. Reuse existing systems. Get explicit approval before running proposed installers, writing configuration, enabling hooks or making global changes.
5. If authorized to implement, use [WORKFLOWS.md](WORKFLOWS.md) and [MOBILE.md](MOBILE.md) as applicable, and inspect actual rendered results.

A GitHub connection does not grant local terminal, MCP, browser or device access. A tool catalog is not authorization. Do not invent compatibility or independent benchmark results.

If editing this guide itself, keep the human README concise, maintain the catalog and decision rules together, update the changelog, and run `node skills/agentic-ui-ux/scripts/test-plan.mjs` and `node skills/agentic-ui-ux/scripts/test-route.mjs` after modifying selection logic. Never add a vendor claim as an independent evaluation.

When the skill is invoked, [source-grounded design](skills/agentic-ui-ux/references/grounding.md) is mandatory. Read only selected upstream knowledge cards and actual sources; do not invent a visual direction without a traceable reference. Validate decision records before visual edits and completion.

For final validation run all test scripts listed in .github/workflows/quality.yml, including repository-wide documentation integrity. Do not weaken acceptance gates or treat synthetic fixtures as real visual evidence.
