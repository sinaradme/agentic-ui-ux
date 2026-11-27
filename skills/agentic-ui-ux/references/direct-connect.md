# Direct upstream connection

## Choose and connect

Read the original description of candidate providers and decide which fit the task. The connector installs the exact native skill IDs supplied by the agent and returns official actions for selected libraries and tools. It preserves ID order and ignores duplicate IDs. It has no default providers or inferred dependencies.

```sh
node "<skill-directory>/scripts/connect.mjs" --list
node "<skill-directory>/scripts/connect.mjs" "<request.json>" "<project-root>" --apply
```

The request has `agent` (`codex`, `cursor` or `claude-code`), `tools` (provider IDs), and optional `policy` (`no-new-tools` to reuse only). An empty list is valid. Omit `--apply` for a read-only plan. The 1.1 request fields `stack`, `goal`, `designMode`, `primary`, `motion` and related routing hints belong to the former interface. Replace them with the IDs required by the actual task.

## Verify original files

The [upstream lock](upstream-lock.json) records original repositories, commit IDs, host variants, file sizes, Git blob hashes and root licenses. The connector fetches a pinned Git checkout, or pinned GitHub raw files for smaller distributions. For a host with GitHub file access and restricted shell networking, use the plan's `repo`, `revision` and `originalDirectory` and the corresponding lock entries to fetch source bytes from the official repository into a temporary directory. Preserve the path layout `<source-root>/<owner>/<repo>/<upstream path>`, including root licenses. Use `--local-source "<source-root>" --apply` and verify the receipt. GitHub API base64 content preserves exact bytes.

The connector copies the full pinned skill tree, including original references, scripts and licenses. It checks hashes before publishing the directory in `.agents/skills` (Codex), `.cursor/skills` (Cursor) or `.claude/skills` (Claude Code). It reuses matching project installations. For a newer original or an already approved symlinked skill, verify its official origin separately through the host's existing installation and use it directly if suitable. For Impeccable the connector copies the original host distribution. Use its original installer if the task needs its optional installer-managed wiring.

Installations with executable hooks or broad provider permissions require the corresponding explicit authorization before using `--allow-hooks` or `--allow-provider-permissions`. Preserve provider and host restrictions for skills that require explicit user invocation or host discovery. Keep project scope. Follow `no-new-tools` for library and runtime actions too.

## Use the original

Start from the receipt's installed `entry`, original URL, and optional `nativeAction`. Use the host's supported native invocation if available and allowed. Otherwise read and apply the original skill and references directly when its invocation restrictions allow it. In a host that only refreshes its skill list at session boundaries, this can continue work in the current turn. The connector verifies files and records `hostActivation: unverified`; report what was actually used.

If an original's workflow requires another tool, open its official documentation and connect that tool as an explicit subsequent choice. The official shadcn CLI, for example, can fetch an exact Magic UI registry item. Read an original sibling reference when an upstream skill requires it, observing any restrictions on invoking it as a separate skill. An `official-source-required` result points to official content to inspect. A `native-actions-required` result means an actual provider action is still pending. Follow [the provider's native action](native-actions.json) and verify its real result.

If one selection is blocked, use successful eligible selections and report the unresolved dependency. Verify source use and the rendered or executable outcome in the task's normal environment.
