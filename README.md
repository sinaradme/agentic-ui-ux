# Agentic UI/UX

Connect a coding agent to original UI, UX and motion tools with one project skill.

One open-source connector for Cursor, Codex and Claude Code. Give it a design task. The agent chooses the upstream tools it needs, installs verified originals on demand, and follows their workflows. Other tools use their own official native installation and invocation paths.

[Give your agent one link](AGENT-SETUP.md) · [Quickstart](QUICKSTART.md) · [Tool directory](TOOLS.md) · [Visual examples](EXAMPLES.md) · [Ready-to-use prompts](WORKFLOWS.md) · [Mobile](MOBILE.md)

## One entry point. Original tools.

Agentic UI/UX connects your coding agent to the actual original design and motion skills. It fetches and verifies complete upstream distributions, installs selected skills in the project's native skill directory, and delegates to their own workflows. It is not a new design system or a substitute for the original providers.

```text
Use agentic-ui-ux to redesign this homepage with professional motion.
```

[Direct connection workflow](skills/agentic-ui-ux/references/direct-connect.md) · [Agent setup](AGENT-SETUP.md) · [Tool directory](TOOLS.md)

## See the difference (upstream example)

| Without Impeccable | With Impeccable |
| --- | --- |
| [![A light hotel landing page with an illustrated villa](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-without.webp)](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-without.webp) | [![A hotel landing page with a full-width nighttime coastal illustration](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-with.webp)](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-with.webp) |

The two designs use different typography, imagery and composition. The tool's author reports using the same model (Fable 5.1) and brief for both. [Original comparison and context](https://github.com/pbakaus/impeccable/tree/2fc5e1459efbbf06d92c7306517c286bf12490cf).

*Official author example, not our own independent benchmark. It illustrates the potential difference, not a guaranteed improvement.*

## 1. Install one skill

Open a terminal in your target project. Install the connector:

```bash
npx skills add sinaradme/agentic-ui-ux --skill agentic-ui-ux
```

Choose your coding agent and project scope. Reload the agent if needed. No third-party design library is installed by this command. The alternative is to give your agent the repository link above. [Setup details](AGENT-SETUP.md).

## 2. Give the agent a design task

```text
Use the agentic-ui-ux skill to redesign this screen with professional motion.
```

The agent reads the original descriptions, chooses the IDs it needs, and installs verified skill trees within the project when authorized. It uses host invocation where available or applies the original files directly where permitted. For libraries and MCP, it runs the selected provider's official action.

## 3. See what was connected

The [tool directory](TOOLS.md) lists candidates and links to their publishers. The [connection CLI](skills/agentic-ui-ux/references/direct-connect.md) accepts only IDs explicitly chosen by the agent and returns the original repository, pinned revision and verified local entry. The agent can connect a further tool if the original workflow requires it.

## 4. Check the real result

An original skill installation is not an agent activation, and neither proves visual quality. The agent must follow the actual original workflow and inspect rendered and interactive output. The former 1.0 playbooks and structural gates remain optional legacy diagnostics; they are not applied over native upstream workflows.

## More examples

| Taste Skill: coffee shop | Taste Skill: events page |
| --- | --- |
| [![Coffee shop website with a large headline and storefront illustration](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/coffee-storefront.webp)](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/coffee-storefront.webp) | [![Event calendar built around a photographic grid](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/night-dates.webp)](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/night-dates.webp) |

*Official [Taste Skill examples](https://github.com/Leonxlnx/taste-skill/tree/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2). These are different briefs, not a before/after comparison.*

[Browse the visual examples and live demos →](EXAMPLES.md)

## Go further

- [Tools](TOOLS.md): what each tool is for, when to skip it, license and recent activity.
- [Mobile](MOBILE.md): native components, animation and testing.
- [Agentic UI/UX skill](skills/agentic-ui-ux/SKILL.md): central orchestration instructions for your agent.
- [Benchmarks](benchmarks/README.md): how we plan to compare real outputs.
- [Contribute](CONTRIBUTING.md) · [Changelog](CHANGELOG.md) · [Editorial QC](REVIEW.md) · [Quality reports](QUALITY.md) · [Final release QC](FINAL-QC.md) · [Rebuild QC](REBUILD-QC.md).

**Research updated:** November 27, 2026 · **Edition:** 1.2 — Agent-selected upstream connection

Installation and actual upstream use are tracked in [Direct connection QC](DIRECT-CONNECT-QC.md). Open-source tools are free to use subject to their licenses; your AI model may have its own costs.

Original guide: [MIT](LICENSE). Third-party examples are linked from their creators, not relicensed here.
