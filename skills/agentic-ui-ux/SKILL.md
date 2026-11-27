---
name: agentic-ui-ux
description: Connect a coding agent directly to the original upstream design, motion, component and verification tools for its UI task. Install and verify selected native skills, then delegate to their own workflows.
license: MIT
metadata:
  version: "1.1"
---

# Agentic UI/UX — direct upstream connection

This skill connects tools. It is not a designer, style guide, creative director or replacement for upstream skills. Legacy playbooks and rebuild gates are optional diagnostics, not mandatory design instructions.

1. Inspect target stack, active agent, actual installed skills, runtime, browser/device access and user intent. Follow [direct-connect.md](references/direct-connect.md). Keep a single primary design owner; respect the user's explicit provider choice.
2. Create task JSON from [connect.example.json](references/connect.example.json). Run `node <skill-directory>/scripts/connect.mjs <task.json> <project-root>` for the connection plan; with project-scoped installation authorization run the same command with `--apply`. Request missing permission once, separate permission for executable hooks, provider-declared broad tool permissions and global changes; never bypass host trust or overwrite an existing original skill.
3. **Delegate, don't paraphrase.** Read the verified original skill entry and follow its own instructions, prerequisites, setup commands, references, examples, tools and finish workflow. Use actual native invocation when exposed by the host, respecting upstream manual/user-invocable flags; reload if discovery requires it. If only file-based use is available, read the full upstream file and required references directly and label it as such. Never claim activation from installation. For Impeccable structural redesign use its original new-work route, narrow improvement its original focused command. Let upstream decide design; no extra creative constraints from this connector.
4. For a selected component registry (including original shadcn and Magic UI skills), runtime, MCP or device tool use its own official direct command/API (native-action-required). Execute the approved native action, verify real imports/tool calls/rendered behavior, and use the actual resource. Never substitute hand-rolled imitations or merely read a README. A manual-only skill is not automatically invoked.
5. Complete using the original provider's checks and actual rendered/interaction evidence. If motion was requested, invoke the relevant original motion skill and show executed motion evidence or explain upstream's reason for restraint. Report any blocked connection, host activation, missing permissions or QA.

The connector installs full pinned original skill trees and verifies bytes, not host invocation. Read [direct connection details](references/direct-connect.md).
