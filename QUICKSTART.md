# Quickstart

[Home](README.md) · [Tools](TOOLS.md) · [Workflows](WORKFLOWS.md)

Want the agent to choose instead? [Give it one link](AGENT-SETUP.md).

**In short:** Run the install command in your project's terminal, then use the installed skill in your agent's chat. You do not need to install every tool.

## 1. Understand what you are installing

| Type | Purpose | Where it goes |
| --- | --- | --- |
| Agent skill | Instructions, examples and sometimes scripts that guide a coding agent | Project or user skill directory |
| Component library | UI source or runtime code used by the app | Project source and/or package dependencies |
| MCP server | A tool connection enabling actions such as registry search or browser inspection | Agent configuration |
| Project instructions | Persistent requirements for one project | AGENTS.md or the agent's supported project rules |

A skill is not necessarily an npm dependency. Installing a skill does not automatically add UI components or give an agent access to the browser. Some skills include scripts or hooks: review them before execution.

## 2. Install one design skill

Prerequisites: a coding agent, Git when needed, Node.js/npm for the following commands, and an existing project or separate test workspace.

Run commands in a real terminal (the IDE's integrated terminal is fine), from the root of the project you intend to change:

```sh
node --version
npm --version
cd /path/to/your/project
npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend
```

On Windows use your real path, e.g. `cd C:\Projects\MyApp`. Pick the agent you use. You may instead target a particular agent:

```sh
npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend --agent cursor
```

Replace cursor with codex or claude-code if appropriate. To discover available skill names before installation:

```sh
npx skills add Leonxlnx/taste-skill --list
```

Default to project scope. Global installation (add `-g` where supported) makes a skill available across projects for that agent; it does not make the skill available to unrelated online chat sessions. Project scope makes team review and reproducibility easier.

See [skills CLI commands](https://github.com/vercel-labs/skills/blob/main/docs/commands.md) for current flags and paths.

For Impeccable, use its own installer instead:

```sh
npx impeccable install
```

Choose your agent and project scope. Reload the tool. Upstream documents `/impeccable init` (Codex: `$impeccable init`). Review hooks and permissions, including any extra trust step. [Official instructions](https://impeccable.style/docs).

UI/UX Pro Max is another alternative, not a mandatory addition:

```sh
npm install -g ui-ux-pro-max-cli
uipro init --ai cursor
```

The first command installs its CLI globally; the second installs project guidance for Cursor. Use `--ai codex` or `--ai claude` as appropriate. Python 3 is required for its search script. [Official instructions](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

## 3. Use it in your agent chat

Open the same project in Cursor, Codex or Claude Code. Verify the skill is discovered (look in the agent's skill list or ask it to identify the actual installed SKILL.md). Reload if needed.

Then send a natural-language request such as:

> Use the installed design-taste-frontend skill for this landing page. Read existing tokens and components first. Implement the page and inspect the rendered result at desktop and mobile widths. Tell me the skill path you used and any unverified checks.

Use a skill picker or explicit invocation if your agent supports it. Do not assume that a normal ChatGPT web conversation shares your local files, installed skills or MCP settings.

## 4. Add UI components only as needed

For a compatible React web project without an established component system, see [shadcn/ui installation](https://ui.shadcn.com/docs/installation). For example:

```sh
npx shadcn@latest init
npx shadcn@latest add button
```

Review the generated files and dependencies. Do not reinitialize or overwrite an existing component system just to follow this guide. A registry is optional; the project's existing components take priority.

## 5. Give the agent visual feedback

If your agent already has browser automation, use it. Otherwise [Playwright MCP](https://github.com/microsoft/playwright-mcp) is one option.

Cursor: open MCP settings, add a server using the project's MCP configuration or the UI. Merge this JSON entry into your existing configuration; do not overwrite other servers:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Codex: add to `~/.codex/config.toml` (or use supported project config):

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]
```

Claude Code: upstream documents this terminal command:

```sh
claude mcp add playwright npx @playwright/mcp@latest
```

Reload the agent, verify the server is connected, run your project using its existing dev command, and ask the agent to inspect the local URL. Browser automation may require an installed browser or an additional setup step. Keep testing on local or authorized environments.

For component discovery, [shadcn MCP](https://ui.shadcn.com/docs/mcp) is optional. Cursor/Claude Code setup is documented upstream. For Codex, merge:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

MCP is not a visual-quality guarantee. Screenshots still need to be inspected by an agent with appropriate vision capabilities or a person.

## 6. Optional: install this guide's skill

If you prefer a single workflow guide that your agent can read directly, run this from your project root:

```sh
npx skills add sinaradme/agentic-ui-ux --skill agentic-ui-ux
```

This uses the standard skills CLI syntax. Reload your agent, verify it discovers `agentic-ui-ux`, and ask it to use the skill for your design task. It selects a minimal plan using its bundled catalog and rules; it does not install third-party tools for you. [Agent-first setup](AGENT-SETUP.md). This exact installation has not yet been executed by the maintainers.

## 7. Reproducibility and safety

The example commands use current upstream installers for discoverability. Before running them, inspect the package, skill scripts, hooks, licenses and transitive dependencies. For team use, pin reviewed versions or commits where supported; record changes to the lockfile or installed skill hashes. Never grant unreviewed tools unrestricted access to secrets, browsers or production systems. Review your Git diff after installation.

**Status:** Commands are documented upstream, not executed or end-to-end tested by this repository.
