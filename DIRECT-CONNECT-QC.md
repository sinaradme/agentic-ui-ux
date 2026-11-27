# Direct connection QC — edition 1.1

## 1.2 — Agent selects, connector installs (2026-11-27)

### Regression and connection checks

The 1.1 CLI added UI/UX Pro Max and the user-invocation-only `pick-ui-library` to a request that named only `emil-web`. The 1.2 CLI accepts an ordered list of provider IDs. Unit checks cover exact selection, duplicates, empty requests, host variants, permissions, existing content and invalid source bytes. The full repository checks passed locally and in GitHub Actions. Live upstream checks passed for Linux and Windows. The isolated central skill install check covered Cursor, Codex and Claude Code project paths. [Pull request and checks](https://github.com/sinaradme/agentic-ui-ux/pull/1)

On Windows, separate exact-ID requests installed and verified original `choreograph`, `animate-expo` and Anthropic `frontend-design` files from two publishers. Repeating the request reused all three installations. These checks verify connection and reuse.

### Independent agent scenario

An independent Codex agent received only the connector path and this task:

> Add a subtle entrance transition to the existing delivery-details disclosure for pointer users. Keep it instantaneous on keyboard activation and with reduced motion. Preserve its accessible button semantics, avoid adding app dependencies for a simple transition, and verify behavior in a browser.

The project started with the connector as its only project-local skill. The agent had project-scoped permission and access to a temporary cache of pinned files from several publishers. Shell Git and raw HTTPS were unavailable in this test environment. The cache contained original bytes from GitHub's file API, and the connector verified each file against its locked blob hash.

| Check | Observed result |
| --- | --- |
| Selection | The agent compared motion skills and selected only `emil-web`, the original `animate` skill for one web transition. |
| Installation | `original-files-verified`, using `--local-source`, with three original files totaling 21,252 bytes. |
| Provenance | [emilkowalski/skills at 64eb3de](https://github.com/emilkowalski/skills/tree/64eb3deb9a5fbfa041faf783e0bc3fd635872e9c/skills/animate). Installed `SKILL.md` SHA-256 `4ce49ea635ec175b45552bae070ea07b2d6aa5367047994250c1c095b71c8585`. |
| Use | The agent read the verified original `SKILL.md` and `RECIPES.md`. It applied state-indication guidance, the CSS and opacity choices, a 200 ms entrance and the upstream easing. The disclosure uses its native HTML button and CSS. |
| Browser | Playwright assertions in Edge 158.0.4370.45 passed for mouse and emulated touch entrances, immediate Enter and Space, reduced motion, focus and ARIA state, interruption, reopening, and immediate collapse. A second run reproduced the assertions. |

This scenario verified original file-based use in an active Codex run. Native skill activation in the host and comparative visual quality remain unverified.

## 1.1 evidence

The reported real-agent homepage result exposed the limitation of a planning-only design wrapper. Edition 1.1 makes the original upstream providers the design authority. The old playbooks and rebuild gates are not the default.

Implementation [f6b8fc7](https://github.com/sinaradme/agentic-ui-ux/commit/f6b8fc73cb80cac8d196743cd33863cf3d27bce9).

- Complete original skill distributions are installed in isolated native project paths with exact original file hashes, scripts, examples and license notices.
- 17 original skill IDs (including the official shadcn and Magic UI skills and three focused Emil companions); Impeccable has host-specific original distributions.
- Original Impeccable context engine and UI/UX Pro Max Python search executed in CI. Native source retrieval and reuse verified; large Taste distribution installed with fixture hook consent, but no hook executed.
- Public central skill installation and direct original animate installation from that installed connector tested.
- The component and runtime handoffs use original official actions; native skill presence is not proof of an actual app dependency or MCP host connection.

CI: [Repository quality](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46026946222), [Direct upstream connections](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46026946468), [Skill install smoke](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46026946795).

Actual in-app Cursor/Codex/Claude invocation, comparative design quality, target project redesign and user-device native interactions are not verified. File installation does not activate the host automatically. The connector does not write arbitrary package/MCP configurations or bypass native permissions. Impeccable manual-copy installation omits optional installer-managed hooks and native subagents. Large distributions need Git or a verified local checkout if GitHub raw access is insufficient.

## Actual non-skill provider execution

At [e970a1f](https://github.com/sinaradme/agentic-ui-ux/commit/e970a1fa3f8d2459135136fd3f3f0eac904bf938), [Official native tools](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46027231726) passed: original Motion 14.14.0 import resolved, official shadcn 4.23.1 fetched actual Magic UI Bento Grid registry source, original Playwright MCP 0.0.86 initialized, listed 25 tools, navigated a real local fixture and captured a screenshot. [Public central install and native original installation](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46027231661) and [repository quality](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46027231587) also passed. These are isolated executable tests, not a visual benchmark or user-agent activation.

## Final cross-platform and registry verification

Implementation [fd9f4ae](https://github.com/sinaradme/agentic-ui-ux/commit/fd9f4ae930f93a2bfd333b4f384d80eec6b95c43). All four workflows passed:

| Test | Result |
| --- | --- |
| [Direct upstream connections](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46027477328) | Linux: all 17 original skill IDs, including full 1,632-file Taste install. Windows: original Impeccable, Emil, UI/UX Pro Max, Stageshow and React Native motion paths; original engine/search executed on both OSes. |
| [Official native tools](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46027477325) | Actual Motion import, official shadcn CLI fetched and added Magic UI Bento Grid source, actual Playwright MCP initialized and captured a browser screenshot. |
| [Skill install smoke](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46027477253) | Central skill installation in isolated native project paths; real original animate installation from public GitHub-installed central skill. |
| [Repository quality](https://github.com/sinaradme/agentic-ui-ux/actions/runs/46027477257) | Existing quality tests and direct connector safeguards passed. |

Windows CI is not the user's Windows installation. Actual host model invocation, provider-specific visual results and comparison to direct standalone skill usage remain unverified. For non-skill tools the agent follows the original native provider action; the connector does not automatically alter the target application or MCP configuration. Registry install was tested on a disposable fixture, not the user's project. The upstream hooks were not executed. No project files on the user's machine were modified.
