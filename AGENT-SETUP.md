# Give your agent one link

```text
Read https://github.com/sinaradme/agentic-ui-ux
Use the direct connection workflow to connect and invoke the original
upstream tools for my UI task. Do not substitute custom design instructions.
```

## Option B: install one orchestration skill (recommended for repeat use)

```bash
npx skills add sinaradme/agentic-ui-ux --skill agentic-ui-ux
```

Then ask the installed skill to perform your task. Authorize project-scoped installation when needed.

## What the agent reads

[SKILL.md](skills/agentic-ui-ux/SKILL.md) and [direct-connect.md](skills/agentic-ui-ux/references/direct-connect.md) are the current entry points. The agent inspects the target, selects original tools, installs verified full original native skill trees, invokes the originals and uses their own workflow.

## Capability routing (recommended)

The current direct connector selects original providers using task intent and stack. The [task JSON example](skills/agentic-ui-ux/references/connect.example.json) is internal to the agent. The [capability index](skills/agentic-ui-ux/references/INDEX.md) is available if a task needs focused specialists.

## Optional local inspector and planner (no npm dependencies)

The read-only inspector and old planner remain optional legacy diagnostics. They are not a substitute for direct connection.

## What happens next

The agent runs the connector plan, then applies it with authorization, invokes the native original and executes any outstanding approved official library/MCP actions. Host reload may be required. Do not claim activation from file installation.

## Check the selection logic

See [Direct connection QC](DIRECT-CONNECT-QC.md).

## Source-grounded design

Follow the selected original provider's own process. Legacy 1.0 grounding/playbooks are optional, not mandatory.

## Creative structural redesign

Ask for a structural redesign and original provider workflow. For Impeccable, the connector directs the task to the original new-work route, not a cosmetic polish command.
