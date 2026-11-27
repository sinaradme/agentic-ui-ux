# Acceptance contract

The objective is a better functioning interface with less manual rework, not maximum tool count.

## Setup acceptance

1. Show evidence for target path, framework and version, package manager, existing design system and installed skills. Distinguish files present from tools actually available. Check CLI requirements and agent support.
2. Select one primary skill at most, plus only explicit gap-filling capabilities. Explain each exclusion. A zero-install result can pass.
3. For each proposal show type (skill/component/runtime/MCP/reference), exact reviewed command or config, scope, revision, license, expected files/hooks, rollback path and verification. Use project scope by default; never overwrite existing config or lockfiles. Do not expose secrets.
4. Ask for explicit approval. If approved and the agent can execute, perform one step at a time and verify it before proceeding. If approval or capability is missing, mark that step blocked. Do not label an example command as already installed.
5. Check skill discovery in the actual agent, dependencies/build, MCP tool availability, and a real browser or device screenshot. Record exact result and errors. If a candidate fails, diagnose; do not install an alternative without approval.

## Design acceptance

Before changing UI, capture a baseline when available, identify user goal, product constraints, relevant visual references and acceptance criteria. Build one representative screen/section first. Respect existing design tokens and functionality. Review actual rendered desktop/mobile/device screens and interaction states. Check layout, typography, spacing, hierarchy, navigation, loading/error states, keyboard/touch, accessibility, reduced motion and build/tests. Iterate on evidence, not on vague aesthetics. Stop when criteria are satisfied or the agreed budget is exhausted. For native, do not count browser screenshots as native proof.

## Minimal report

- Target / task / observed environment:
- Existing tools reused:
- New candidates and why:
- Excluded tools and why:
- Approved changes / exact revisions:
- Executed steps and actual verification:
- Screenshots, interaction checks, test results:
- Blocked checks and remaining risks:
- Outcome: setup planned / setup verified / design verified / blocked (state evidence for each).

No independent quality improvement is established without a controlled baseline comparison. Use the project benchmark protocol for comparative claims.
