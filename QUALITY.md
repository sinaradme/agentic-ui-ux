# v1.0 quality and scope

The goal is to let a coding agent read one repository, inspect a target project, choose the smallest compatible tool setup, request approval, then verify the setup and rendered design. The guide is not an autonomous installer or proof that a particular skill improves every design.

## Review findings and corrections

| Gap in v0.3 | v1.0 correction |
| --- | --- |
| Context had to be built manually | Read-only inspector produces a conservative context draft; monorepos/ambiguous stacks remain unknown |
| Existing file could be mistaken for installed, functional tooling | Signals are separate from confirmed inventory; require actual agent/tool verification |
| Unneeded primary skill could be invoked for motion/QA | Focused tasks skip the primary skill |
| Contradictory component inventory could trigger duplicate setup | Block inconsistent inventory |
| Catalog lacked operational acceptance criteria | Per-tool license, activity, official sources and verification steps |
| Runtime presence could be mistaken for version compatibility | Check installer engine constraints and exact versions before approval |
| No explicit end-to-end report | Setup and rendered-design acceptance contract with blockers and evidence |

## Evidence

| Area | Result |
| --- | --- |
| Selection logic | 32/32 deterministic fixtures passed in authoring JavaScript runtime |
| Inspector classification | 11/11 deterministic classifier fixtures passed in authoring JavaScript runtime |
| Local CLI / filesystem tests | Passed in [GitHub Actions run 45960613804](https://github.com/sinaradme/agentic-ui-ux/actions/runs/45960613804), Node 24.22.3 on Ubuntu: filesystem inspection, symlink isolation, isolated skill copy, actual CLI exit codes, unchanged project lockfile |
| Skill installation using official Skills CLI 1.9.1 | Passed: [final CI run 45960613833](https://github.com/sinaradme/agentic-ui-ux/actions/runs/45960613833). Installed the skill from the checked-out repo in three isolated target projects for Cursor, Codex and Claude Code, ran the installed scripts and verified unchanged app manifests. Also passed the public GitHub shorthand install route in a fourth Codex-path fixture. This checks packaging, not agent model behavior. |
| Actual in-app agent discovery and instruction following | Not yet tested in running Cursor, Codex or Claude Code sessions |
| Real MCP connection / native device / browser QA | Not yet verified end-to-end |
| Baseline vs skill-generated UI quality, manual edits and time | No independent results yet |

No live project dependencies were changed during this release. The selector only produces a proposal. It does not execute installers or modify settings. The inspector does not run project scripts or read arbitrary project files, and does not infer a complete inventory.

## Agent Skills standard

Reviewed against the [Agent Skills specification](https://agentskills.io/specification): matching skill/directory name, valid required metadata, compact entry instructions, bundled references and scripts, relative file paths and progressive disclosure. Version and license metadata plus the MIT notice are included in the installed skill. The standard describes a packaging format, not a guarantee of agent obedience or design quality. This is a manual specification review, not certification by the reference validator.

## Reproduce

From the repository root, with Node.js:

```sh
node skills/agentic-ui-ux/scripts/test-plan.mjs
node skills/agentic-ui-ux/scripts/test-inspect.mjs
node skills/agentic-ui-ux/scripts/test-cli.mjs
```

For practical adoption, use a throwaway target project, [agent setup](AGENT-SETUP.md), the [acceptance contract](skills/agentic-ui-ux/references/acceptance.md) and [benchmark protocol](benchmarks/README.md).

## Release boundary

v1.0 describes a complete, usable selection guide and reviewable plan-only engine. It does not establish that an arbitrary agent will follow every instruction, that upstream dependencies install in every environment, or that the final visual output is better than a baseline. Those require actual agent sessions with controlled project evidence. The first independent benchmark must publish failures as well as successes.

## Capability routing expansion (same v1.0 edition)

The default workflow now routes the user's task into 42 capabilities in 12 playbooks rather than choosing an entire library by category. It separates design guidance, runtime/component implementation and QA tools, preserves one primary owner and existing systems, limits specialist additions, treats unknown coverage as unverified, and prevents automatic lower-tier fallback. The route fixtures verify stable ordering, deduplication, stack isolation, evidence requirements, budgets, and no execution authorization. Run `node skills/agentic-ui-ux/scripts/test-route.mjs`. CI evidence for this expansion is available on [Actions](https://github.com/sinaradme/agentic-ui-ux/actions). It still does not establish human cognitive-load reduction, autonomous agent compliance or equal/improved design quality; those require controlled real agent trials.
