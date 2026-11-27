# Agentic UI/UX

Build better websites and apps with AI coding agents — without installing dozens of tools.

One free, open-source orchestration skill for Cursor, Codex, Claude Code and other coding agents. Give the agent a design task; it chooses compatible tools and documented patterns, then verifies the rendered result.

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

The agent routes the task to the relevant capabilities, uses the project's existing system first, and proposes external tools only for verified gaps. Every material visual decision must be grounded in an inspected project/user reference or a documented upstream pattern. [Source-grounding contract](skills/agentic-ui-ux/references/grounding.md) · [Reviewed upstream knowledge](skills/agentic-ui-ux/references/knowledge/INDEX.md). No need to install every library. [How routing works](skills/agentic-ui-ux/references/routing.md) · [Capability index](skills/agentic-ui-ux/references/INDEX.md)

## See the difference (upstream example)

| Without Impeccable | With Impeccable |
| --- | --- |
| [![A light hotel landing page with an illustrated villa](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-without.webp)](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-without.webp) | [![A hotel landing page with a full-width nighttime coastal illustration](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-with.webp)](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-with.webp) |

The two designs use different typography, imagery and composition. The tool's author reports using the same model (Fable 5.1) and brief for both. [Original comparison and context](https://github.com/pbakaus/impeccable/tree/2fc5e1459efbbf06d92c7306517c286bf12490cf).

*Official author example, not our own independent benchmark. It illustrates the potential difference, not a guaranteed improvement.*

## 1. Install one skill

Open a terminal in your target project. Review the repository and install only the orchestration skill:

```bash
npx skills add sinaradme/agentic-ui-ux --skill agentic-ui-ux
```

Choose your coding agent and project scope. Reload the agent if needed. No third-party design library is installed by this command. The alternative is to give your agent the repository link above. [Setup details](AGENT-SETUP.md).

## 2. Give the agent a design task

```text
Use the agentic-ui-ux skill to redesign this screen.
Inspect the project first, preserve its behavior and explicit constraints,
rebuild old composition unless I ask for refinement, select only needed tools,
and verify the actual
rendered result on the relevant devices.
Ask before installing tools or making changes outside the task.
```

You do not need to name any libraries. The agent should handle routine design decisions, present one consolidated approval plan if new tools are necessary, and show evidence of the result.

## Rebuild, not just polish

A structural redesign uses rebuild mode by default: old composition is baseline, not authority. The agent retrieves concrete external patterns, considers three different structural concepts per section, selects a task-fit direction and verifies actual before/after changes. Existing dependencies may still be reused. [Rebuild contract](skills/agentic-ui-ux/references/rebuild.md) · [Direct source access](skills/agentic-ui-ux/references/source-access.md).

Installing this one skill does not install all upstream tools or grant external access automatically. The source retrieval CLI and catalog provide direct paths; missing runtime dependencies still require authorized installation.

## 3. Understand what the agent selects

| Task | Preferred route (if a gap exists) |
| --- | --- |
| New marketing website | Taste, with the layout and art-direction playbooks |
| New functional product UI | Impeccable, existing system and task-specific patterns |
| Existing product redesign | Impeccable, existing tokens and visual QA |
| UX / design-system planning | UI/UX Pro Max |
| Motion | Focused Emil guidance; existing CSS/runtime first; Motion only for an advanced compatible gap |
| React components | Existing component system; shadcn/ui only for a confirmed gap |
| Native app | Native primitives; platform-specific guidance and device QA |
| Graphics / effects | Existing licensed assets; a focused specialized tool only when needed |

These are task-specific defaults, not measured quality rankings. A narrow task may need no external tool. The router has 42 capabilities across 12 playbooks and 26 catalogued tools. It avoids stacking primary skills, competing component systems and duplicate animation runtimes. [Manual tool selection](TOOLS.md) remains available.

## 4. Check the real result

Ask the agent to inspect the actual rendered interface, test the important states and interactions, fix blocking issues first, and report missing evidence. Browser or native device access is required for the corresponding checks. A successful install is not a successful design.

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
- [Contribute](CONTRIBUTING.md) · [Changelog](CHANGELOG.md) · [Editorial QC](REVIEW.md) · [v1.0 quality report](QUALITY.md) · [Final release QC](FINAL-QC.md) · [Rebuild QC](REBUILD-QC.md).

**Research updated:** November 27, 2026 · **Edition:** 1.0

We review upstream docs, repository metadata and selected official examples. The capability router, source-grounding checker, project inspection, CLI and project-scoped skill installation have passed CI checks. See [the evidence](QUALITY.md). In-app agent behavior and independent design-quality comparisons have not yet been validated. Open-source tools are free to use subject to their licenses; your AI model may have its own costs.

Original guide: [MIT](LICENSE). Third-party examples are linked from their creators, not relicensed here.
