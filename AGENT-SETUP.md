# Set up Agentic UI/UX

From your project, install the connector once and select your active agent and project scope.

```sh
npx skills add sinaradme/agentic-ui-ux --skill agentic-ui-ux
```

To update an installation managed by the same CLI, run `npx skills update agentic-ui-ux` in the project. For a global installation, update it in that scope.

Give the agent one task prompt, for example:

```text
Use agentic-ui-ux to add an entrance transition to the existing details panel.
```

The agent starts with [SKILL.md](skills/agentic-ui-ux/SKILL.md), identifies needed tools using the [catalog](skills/agentic-ui-ux/references/catalog.json), and connects the chosen IDs through the [direct connection workflow](skills/agentic-ui-ux/references/direct-connect.md). It uses the original provider instructions and performs the task. Host discovery and provider-specific permissions remain subject to the active host.

To use the instructions without installing first, point your agent to [SKILL.md on GitHub](https://github.com/sinaradme/agentic-ui-ux/blob/main/skills/agentic-ui-ux/SKILL.md) and give it the task. The agent needs the skill directory to run the connector.

[Quickstart](QUICKSTART.md) · [Connection test results](DIRECT-CONNECT-QC.md)
