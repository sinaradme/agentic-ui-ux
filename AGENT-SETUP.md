# Give your agent one link

You don't need to memorize a stack. Open the **target project** in your coding agent, connect GitHub or provide access to this public repository, then paste:

```text
Read https://github.com/sinaradme/agentic-ui-ux
Start with AGENTS.md and follow the agentic-ui-ux skill.
Inspect my current project and identify the minimal tools, skills,
component libraries and visual QA setup needed for my task.
Reuse what is already installed. Show a plan with exact commands,
compatibility checks and reasons. Ask before making changes.
```

You can add the actual task to the same message (for example: redesign the onboarding flow, build a Next.js landing page, or improve Expo motion). The agent must have read access to the guide and the target project. Merely connecting GitHub does not load instructions automatically.

## Option B: install one orchestration skill

From the target project's terminal:

```sh
npx skills add sinaradme/agentic-ui-ux --skill agentic-ui-ux
```

This is the standard upstream skills CLI syntax; choose your coding agent and project scope. Review the source before installation. This repo's skill contains its own catalog, rules and optional planner in the same folder; it does not bundle or install third-party tools. Reload the agent and ask it to use agentic-ui-ux. The actual installation/discovery has not yet been executed by this repository.

## What the agent reads

| File | Role |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Entry point when reading the repository |
| [SKILL.md](skills/agentic-ui-ux/SKILL.md) | Reusable workflow and safety gates |
| [Decision rules](skills/agentic-ui-ux/references/decision-rules.md) | How to pick tools |
| [Catalog JSON](skills/agentic-ui-ux/references/catalog.json) | Machine-readable tools, compatibility and installation examples |
| [Context schema](skills/agentic-ui-ux/references/context.schema.json) | Evidence needed about the target |
| [Planner](skills/agentic-ui-ux/scripts/plan.mjs) | Optional deterministic, plan-only Node.js tool |

## Optional local planner (no npm dependencies)

If you have a local checkout, copy the [example context](skills/agentic-ui-ux/references/context.example.json) to a temporary file, replace the example values with evidence from your target project, and run:

```sh
node skills/agentic-ui-ux/scripts/plan.mjs /path/to/context.json
```

The planner reads only the supplied JSON and local catalog/schema and prints a proposed plan. It does not inspect the target automatically, run installers, execute shell commands or modify settings. A read-only agent can follow the decision rules without Node.js. Do not provide secrets in the context.

Example: a Next.js site with an existing component library and working browser access may need only Taste Skill for a new page. An existing site with no compatible primary skill and no browser access may get Impeccable plus Playwright MCP. An Expo animation task selects animate-expo, not web components. Flutter starts with its SDK. The actual results depend on the inspected project and user task.

## What happens next

The agent should explain what it will reuse, what it proposes to add, what is blocked, and why. It must verify the exact upstream revision, license, agent/framework compatibility, installers and hooks before asking approval. If you approve specific changes, your coding agent with the necessary permissions can execute them in the target project and verify the result.

## Check the selection logic

```sh
node skills/agentic-ui-ux/scripts/test-plan.mjs
```

The 21 fixture scenarios check tool selection, reuse, native/web separation, unknown inputs, prerequisite gates and plan-only behavior. These are logic tests, not installation tests or visual-quality benchmarks.

[Return home](README.md) · [Manual setup](QUICKSTART.md) · [Tool directory](TOOLS.md)
