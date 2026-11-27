---
name: agentic-ui-ux
description: Connect to original upstream UI, UX, motion, component or verification tools while building, refining or reviewing websites and apps. Inspect the project, choose relevant upstream skills and libraries, install them on demand and follow their original workflows.
license: MIT
metadata:
  version: "1.2"
---

# Agentic UI/UX

1. Inspect the task, project stack and active host. Check for compatible tools already installed. Use the [official source catalog](references/catalog.json) or run `node "<this-skill>/scripts/connect.mjs" --list` to find candidates. Inspect their original descriptions and choose the IDs yourself based on the work. Honor a provider named by the user. Keep the selection as small as the task allows. If a missing candidate is outside the catalog, find its official installation and instructions directly.
2. Put the chosen IDs into a project-scoped request using [connect.example.json](references/connect.example.json). Run `node "<this-skill>/scripts/connect.mjs" "<request.json>" "<project-root>" --apply` when project-scoped installation is authorized. An explicit request to use this connector covers ordinary project-scoped skill installation, subject to the task and host permissions. Use the same command without `--apply` for a read-only preview. Follow [direct-connect.md](references/direct-connect.md) for blocked network, installed versions, and provider permissions. Keep the request in a temporary file.
3. Use each original immediately. Invoke it through the active host if it is exposed and permits invocation. When native invocation is unavailable in the current run, read the full verified original `SKILL.md` at the receipt's `entry` and any references it requires, then carry out its instructions in this task. Follow original invocation restrictions. If the original points to another skill or tool needed for this task, connect that exact tool in a subsequent request and follow its original workflow. Keep working without sending the provider names back for the user to invoke.
4. Execute required upstream setup, search, registry or library commands under the task's authorization. Use the [official action details](references/native-actions.json) for existing entries and current upstream docs for compatibility. Verify executable results, imports or rendered behavior where applicable. Record the original repo and revision, how the original was used, and the result. File installation, original file-based use and invocation through the host are separate results.

The upstream provider supplies the design and QA workflow. The connector accepts a list of IDs and preserves the original files and invocation restrictions.
