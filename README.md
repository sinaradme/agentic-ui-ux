# Agentic UI/UX

Build better websites and apps with AI coding agents — without installing dozens of tools.

A free, open-source guide for Cursor, Codex, Claude Code and other coding agents. Pick the right design skill, give your agent a clear task, and check the result in a real browser or on a device.

[Give your agent one link](AGENT-SETUP.md) · [Quickstart](QUICKSTART.md) · [Tool directory](TOOLS.md) · [Visual examples](EXAMPLES.md) · [Ready-to-use prompts](WORKFLOWS.md) · [Mobile](MOBILE.md)

## Let your agent choose for you

Open your target project in Cursor, Codex or Claude Code and paste:

```text
Read https://github.com/sinaradme/agentic-ui-ux
Start with AGENTS.md. Inspect my project and select the smallest
compatible design-tool setup. Reuse what I have. Show the plan and
ask before installing or changing anything.
```

The repository includes one skill, 12 focused playbooks, a capability router and a read-only project inspector. No need to memorize the tools. [Agent setup →](AGENT-SETUP.md)

## One skill, focused capabilities

| Design | Build | Verify |
| --- | --- | --- |
| Art direction, UX, layout, typography, design systems | Components, motion, interactions, graphics, responsive/native | Accessibility, performance, visual QA |

The agent routes the task to the relevant capabilities, uses the project's existing system first, and proposes external tools only for verified gaps. No need to install every library. [How routing works](skills/agentic-ui-ux/references/routing.md) · [Capability index](skills/agentic-ui-ux/references/capabilities.json)

## See the difference

| Without Impeccable | With Impeccable |
| --- | --- |
| [![A light hotel landing page with an illustrated villa](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-without.webp)](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-without.webp) | [![A hotel landing page with a full-width nighttime coastal illustration](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-with.webp)](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-with.webp) |

The two designs use different typography, imagery and composition. The tool's author reports using the same model (Fable 5.1) and brief for both. [Original comparison and context](https://github.com/pbakaus/impeccable/tree/2fc5e1459efbbf06d92c7306517c286bf12490cf).

*Official author example, not our own independent benchmark. It illustrates the potential difference, not a guaranteed improvement.*

## 1. Pick one tool

| I want to… | Start here |
| --- | --- |
| Build a distinctive website from scratch | [Taste Skill](https://github.com/Leonxlnx/taste-skill) |
| Improve an existing website or dashboard | [Impeccable](https://github.com/pbakaus/impeccable) |
| Plan the UX and design system | [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| Improve animations and gestures | [Emil's skills](https://github.com/emilkowalski/skills) |
| Build a mobile app | [React Native / Flutter guide](MOBILE.md) |

These are suggested starting points, not measured rankings. **You do not need all of them.**

## 2. Install and try it

Open a terminal inside the project you want to design. Node.js/npm is required for these example installers. Review the upstream source before running an installer.

**New website:**

```bash
npx skills add Leonxlnx/taste-skill --skill design-taste-frontend
```

Choose your coding agent and project scope. Reload the agent if needed.

**Existing website (alternative):**

```bash
npx impeccable install
```

Reload your agent and run `/impeccable init` (Codex: `$impeccable init`).

[More installation details, agent setup and MCP configuration →](QUICKSTART.md)

## 3. Give your agent a task

Paste into your coding agent's chat after installing the appropriate skill:

```text
Use the installed design skill. Read the existing project and design
system first. Design the requested page with clear typography, spacing
and visual hierarchy. Reuse existing components. Keep all existing
functionality working. Open the result in a browser, inspect desktop
and mobile, fix visible problems and report anything you could not verify.
```

For motion, dashboards, redesigns and other tasks, use the [ready-to-use prompts](WORKFLOWS.md).

## 4. Check the real result

- Run your project and open the page.
- Check desktop and mobile layouts, navigation and important UI states.
- Fix visible issues before asking for more features.
- If the agent cannot inspect the browser, add [browser access](QUICKSTART.md#5-give-the-agent-visual-feedback) or supply screenshots.

A skill improves guidance; it does not give the agent browser access or guarantee good design.

## More examples

| Taste Skill: coffee shop | Taste Skill: events page |
| --- | --- |
| [![Coffee shop website with a large headline and storefront illustration](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/coffee-storefront.webp)](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/coffee-storefront.webp) | [![Event calendar built around a photographic grid](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/night-dates.webp)](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/night-dates.webp) |

*Official [Taste Skill examples](https://github.com/Leonxlnx/taste-skill/tree/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2). These are different briefs, not a before/after comparison.*

[Browse the visual examples and live demos →](EXAMPLES.md)

## Go further

- [Tools](TOOLS.md): what each tool is for, when to skip it, license and recent activity.
- [Mobile](MOBILE.md): native components, animation and testing.
- [Agentic UI/UX skill](skills/agentic-ui-ux/SKILL.md): optional workflow instructions for your agent.
- [Benchmarks](benchmarks/README.md): how we plan to compare real outputs.
- [Contribute](CONTRIBUTING.md) · [Changelog](CHANGELOG.md) · [Editorial QC](REVIEW.md) · [v1.0 quality report](QUALITY.md).

**Research updated:** November 27, 2026 · **Edition:** 1.0

We review upstream docs, repository metadata and selected official examples. The selection logic, project inspection and project-scoped skill installation have passed CI checks. In-app agent behavior and independent design-quality comparisons have not yet been validated. Open-source tools are free to use subject to their licenses; your AI model may have its own costs.

Original guide: [MIT](LICENSE). Third-party examples are linked from their creators, not relicensed here.
