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

## Option B: install one orchestration skill (recommended for repeat use)

From the target project's terminal:

```sh
npx skills add sinaradme/agentic-ui-ux --skill agentic-ui-ux
```

This is the standard upstream skills CLI syntax; choose your coding agent and project scope. Review the source before installation. This repo's skill contains its own catalog, rules and optional planner in the same folder; it does not bundle or install third-party tools. Reload the agent and ask it to use agentic-ui-ux. The pinned Skills CLI successfully installed this skill from a local checkout into isolated Cursor, Codex and Claude Code project paths; the installed scripts also ran successfully. The public GitHub shorthand install route also passed in a disposable Codex-path project using the pinned CLI. In-app agent discovery and behavior remain unverified. See [quality evidence](QUALITY.md).

## What the agent reads

| File | Role |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Entry point when reading the repository |
| [SKILL.md](skills/agentic-ui-ux/SKILL.md) | Reusable workflow and safety gates |
| [Capability index](skills/agentic-ui-ux/references/INDEX.md) | 12 domains and their routing tables |
| [Routing guide](skills/agentic-ui-ux/references/routing.md) | How to decompose a task and choose sources |
| [Execution workflow](skills/agentic-ui-ux/references/execution.md) | One consolidated approval, implementation and evidence |
| [Catalog JSON](skills/agentic-ui-ux/references/catalog.json) | Machine-readable tools, compatibility and installation examples |
| [Context schema](skills/agentic-ui-ux/references/context.schema.json) | Evidence needed about the target |
| [Router](skills/agentic-ui-ux/scripts/route.mjs) | Recommended task-specific plan-only engine |
| [Planner](skills/agentic-ui-ux/scripts/plan.mjs) | Legacy coarse setup-only path |

## Capability routing (recommended)

The agent breaks a task into focused capabilities, checks existing coverage and reads only the relevant playbooks. Use the [routing guide](skills/agentic-ui-ux/references/routing.md). With local files and Node.js, create a request from the [example](skills/agentic-ui-ux/references/route.example.json) and run:

```sh
node skills/agentic-ui-ux/scripts/route.mjs /path/to/request.json
```

This produces a plan with selected playbooks, reused tools, candidates and blocked checks. It does not install or activate anything. The older coarse planner below remains available for setup-only requests.

## Optional local inspector and planner (no npm dependencies)

From a local checkout, collect a safe context draft for the actual target project:

```sh
node skills/agentic-ui-ux/scripts/inspect.mjs /path/to/target-project
```

This only reads a small allowlist of project files, detects framework/package-manager signals and lists known project skill names. It deliberately leaves inventory and tool availability unconfirmed. It never reads environment files or executes project scripts. Verify the draft, including global skills and live browser/device capabilities, before planning. For monorepos choose the actual application directory.

If you have a local checkout, save and complete the inspector context draft, or copy the [example context](skills/agentic-ui-ux/references/context.example.json) to a temporary file, replace the example values with evidence from your target project, and run:

```sh
node skills/agentic-ui-ux/scripts/plan.mjs /path/to/context.json
```

The planner reads only the supplied JSON and local catalog/schema and prints a proposed plan. It does not inspect the target automatically, run installers, execute shell commands or modify settings. A read-only agent can follow the decision rules without Node.js. Do not provide secrets in the context.

Example: a Next.js site with an existing component library and working browser access may need only Taste Skill for a new page. An existing site with no compatible primary skill and no browser access may get Impeccable plus Playwright MCP. An Expo animation task selects animate-expo, not web components. Flutter starts with its SDK. The actual results depend on the inspected project and user task.

## What happens next

The agent should explain what it will reuse, what it proposes to add, what is blocked, and why. It should not ask you to choose between equivalent libraries; the agent owns that decision within your constraints. For new tools it should present one consolidated approval plan. It must verify the exact upstream revision, license, agent/framework compatibility, installers and hooks before asking approval. If you approve specific changes, your coding agent with the necessary permissions can execute them in the target project and verify the result.

## Check the selection logic

```sh
node skills/agentic-ui-ux/scripts/test-plan.mjs
node skills/agentic-ui-ux/scripts/test-inspect.mjs
node skills/agentic-ui-ux/scripts/test-route.mjs
```

The 32 planner fixture scenarios check tool selection, reuse, native/web separation, unknown inputs, prerequisite gates and plan-only behavior. The 11 inspector classifier fixtures and filesystem checks cover framework detection and the inspection-to-plan path. The 59 route fixtures and 504 cross-product invariant checks cover capability selection, source priority, unknown coverage, conflicts and platform isolation. These are not visual-quality benchmarks. See [v1.0 quality report](QUALITY.md).

[Return home](README.md) · [Manual setup](QUICKSTART.md) · [Tool directory](TOOLS.md)
