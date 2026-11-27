# Direct upstream connection

The original provider owns design, motion and QA. Agentic UI/UX connects the agent to it. The former route/playbooks/grounding/rebuild gates are optional historical diagnostics, not mandatory instructions applied on top of upstream.

## One path

The agent inspects the target and writes a small JSON like [connect.example.json](connect.example.json).

```sh
node <skill-directory>/scripts/connect.mjs <task.json> <project-root>
node <skill-directory>/scripts/connect.mjs <task.json> <project-root> --apply
```

The first invocation is read-only. The second requires project-scoped installation authorization. Use `primary` for the user's chosen original, `tools` for specific specialists, `motion: true` for requested animation, and `capabilities` only if relevant. `policy: no-new-tools` prevents new native skill installations and must also be respected for official actions. No automatic global changes, package installs, hook approval or broad allowed-tools approval. Reuse verified originals; never overwrite mismatched existing files.

| Intent | Original provider |
| --- | --- |
| New marketing web site | Taste (separate approval for its executable hook) |
| Web redesign, functional UI, design review | Impeccable |
| UX planning / native design intelligence | UI/UX Pro Max |
| Web motion | Emil animate, focused choreograph/gestures/performance when relevant |
| RN/Expo motion | Emil animate-expo |
| Product UI illustration | Stageshow when appropriate |
| Component registries | Original shadcn and Magic UI skills + actual upstream CLI |
| Flutter | Actual SDK and official docs |

No quality ranking is implied. Other providers may be explicitly selected.

## Original installation

The [upstream lock](upstream-lock.json) records publisher Git tree paths, file sizes, Git blob hashes and reviewed commits, not copied design instructions. The connector obtains the complete original distribution via pinned Git checkout, then exact GitHub raw files for smaller distributions if Git fails. For offline use supply an official checkout tree via `--local-source <directory>` with layout `<directory>/<owner>/<repo>`; all files must match the pinned manifest. No source modifications, shell interpolation or installer execution. Cursor uses `.cursor/skills`, Codex `.agents/skills`, Claude Code `.claude/skills`; Impeccable selects its original host-specific distribution. All original files, references, data, examples, scripts, executable modes and license notices are preserved; root licenses are copied as UPSTREAM-*. Staged verification precedes rename. A mismatch or duplicate blocks. The connector does not modify app manifests or host config. Impeccable's manual-copy method omits its optional installer-managed hook and subagents: use its official installer separately if specifically authorized. Taste has an original executable hook in its frontmatter; use `--allow-hooks` only with separate explicit approval. Manual-only skills retain original invocation restrictions. The original shadcn skill declares broad allowed-tools and executable context, so its native installation requires explicit separate approval via `--allow-provider-permissions`; its user-invocable:false flag is preserved and it is not a user slash command. Magic UI delegates actual registry operations to shadcn.

## Actual use

1. Invoke the original skill in the active host (Codex dollar prefix, Claude Code/Cursor native skill UI or supported invocation syntax). Reload if skills are discovered at session start. The connector reports hostActivation unverified, not native activation.
2. Follow the actual skill. Impeccable's native `scripts/impeccable context` (Windows launcher `scripts/impeccable.cmd`) selects the right upstream playbook and may download its engine. Use its own new-work flow for replacement design. UI/UX Pro Max runs its real `scripts/search.py`. Taste runs its own scripts including its gate. Emil uses original referenced files; pick-ui-library is manual-only. Stageshow uses its own kit/examples and rehearsal. Read the actual upstream workflow and prerequisites, not this summary.
3. For libraries, registries and MCP, the connector returns native-action-required for outstanding actual tool actions, even when the corresponding original native skill files have been verified. Use [official native actions](native-actions.json) and the original docs: shadcn/Magic UI CLI view/add on the exact item, Motion/native compatible package-manager setup, native MCP host connection and real tool calls. Do not silently install arbitrary packages or edit MCP settings. Execute the actual approved native action, verify import or tool call, and use the resource.
4. Run original provider checks and verify real rendered output and interaction. Report original tool name, revision, invocation mode and actual executed commands. Blocked access is not a successful design.

## Boundaries

A central install does not install all libraries or grant network/device access. File verification is not host activation. No universal cross-agent API can force invocation. No claim of visual equivalence follows from successful installation. For current upstream releases review and update the lock rather than silently using mutable latest.

A user-approved newer original already installed in the host should not be downgraded or overwritten to satisfy this lock. Verify its current upstream origin separately and invoke it directly; report that it is not verified by this pinned connector. Use the reviewed package versions returned by the direct actions only after confirming current compatibility and actual published versions. Follow each provider's own guidance.
