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
| Local CLI / filesystem tests | Test scripts included; see CI status when available |
| Real skill installer, discovery in Cursor/Codex/Claude Code | Not yet independently verified |
| Real MCP connection / native device / browser QA | Not yet verified end-to-end |
| Baseline vs skill-generated UI quality, manual edits and time | No independent results yet |

No live project dependencies were changed during this release. The selector only produces a proposal. It does not execute installers or modify settings. The inspector does not run project scripts or read arbitrary project files, and does not infer a complete inventory.

## Reproduce

From the repository root, with Node.js:

```sh
node skills/agentic-ui-ux/scripts/test-plan.mjs
node skills/agentic-ui-ux/scripts/test-inspect.mjs
```

For practical adoption, use a throwaway target project, [agent setup](AGENT-SETUP.md), the [acceptance contract](skills/agentic-ui-ux/references/acceptance.md) and [benchmark protocol](benchmarks/README.md).

## Release boundary

v1.0 describes a complete, usable selection guide and reviewable plan-only engine. It does not establish that an arbitrary agent will follow every instruction, that upstream dependencies install in every environment, or that the final visual output is better than a baseline. Those require actual agent sessions with controlled project evidence. The first independent benchmark must publish failures as well as successes.
