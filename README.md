# Agentic UI/UX

**A practical, evidence-aware playbook for building better interfaces with AI coding agents.**

Stop collecting tools. Start with one design skill, use your existing component system, and make the agent inspect its own rendered work.

This repository distills research into actionable recommendations for designers, frontend engineers and AI-assisted product builders. It focuses on free, open-source resources rather than paid component packs or proprietary subscriptions.

**Edition:** 0.1 · **Research snapshot:** 2026-11-27 · **Evidence:** documentation and repository metadata reviewed; comparative hands-on benchmarks not yet available.

## Start here

| Your goal | Start with | Add only when needed |
| --- | --- | --- |
| New web landing page | Taste Skill | Existing UI system or shadcn/ui; Magic UI for selected effects |
| Existing app or dashboard | Impeccable | Existing design system; targeted interaction skills |
| Complex UI/UX planning | UI/UX Pro Max | A component system compatible with your stack |
| Motion and micro-interactions | Emil's skills | Motion or your existing animation library |
| React Native / Flutter | Native design system and device testing | Platform-specific motion and a compatible design skill |

These are **starting hypotheses, not benchmark winners**. Choose one primary design skill. Do not install every option.

### The shortest useful setup

Open a terminal in your **actual web project**, not this guide's repository. For a new website with Node.js available:

```sh
npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend
```

Choose your coding agent and project scope when prompted. Inspect the downloaded skill, reopen your agent if necessary, then ask:

> Use design-taste-frontend. Read my project and existing design tokens first. Define an intentional visual direction, build the requested page, render it in a real browser, inspect desktop and mobile, and fix visual and interaction issues. Preserve existing functionality. Report what you could not verify.

If your agent cannot operate a browser, configure a browser tool or capture screenshots yourself. A skill alone does not grant browser access.

For existing interfaces, an alternative starting point is:

```sh
npx impeccable install
```

Reload your agent and follow the upstream initialization instructions. Review any offered hooks before approving them.

## The workflow

**Brief → visual direction → implementation → rendered inspection → refinement → acceptance**

1. Establish audience, task, constraints and an explicit visual direction.
2. Reuse the project's existing tokens and components before adding dependencies.
3. Build a working vertical slice rather than generating every screen at once.
4. Render real screens and inspect layout, hierarchy, motion and interaction states.
5. Fix issues and record the evidence. Never claim a visual check that did not happen.

## Documentation

| Guide | What it answers |
| --- | --- |
| [Quickstart](QUICKSTART.md) | Where commands run, project vs global scope, Cursor/Codex/Claude Code and MCP setup |
| [Curated tools](TOOLS.md) | What each tool does, when to use it, evidence, activity and license |
| [Workflows](WORKFLOWS.md) | Ready-to-use prompts for new sites, existing products and interaction design |
| [Mobile](MOBILE.md) | React Native and Flutter: what transfers and what changes |
| [Benchmarks](benchmarks/README.md) | A repeatable evaluation protocol and honest testing status |
| [Agent skill](skills/agentic-ui-ux/SKILL.md) | A framework-aware workflow for agents |
| [Contributing](CONTRIBUTING.md) | How to propose tools, corrections and reproducible evaluations |
| [Changelog](CHANGELOG.md) | Research and editorial updates |

## Why this guide is different

- **Decision-first:** a small default path, optional extensions, no dependency shopping list.
- **Evidence-first:** repository activity and popularity are context, not proof of output quality.
- **Framework-aware:** web component code is not portable to native mobile.
- **Human- and agent-readable:** practical commands and a reusable skill for navigating the guide.
- **Free-source focus:** upstream licenses are recorded separately; paid add-ons are not required for the recommended open-source path.

The agent or model you use may have its own costs. Inspect all third-party code and licenses before installation. No skill can guarantee a flawless or production-ready design.

## Evidence policy

**Reviewed** means the upstream material or repository metadata was inspected. **Candidate** means an option needs further investigation. **Tested** requires reproducible runs, screenshots and recorded conditions. No tool in this edition has been comparatively tested by this project.

Browse the [original research shortlist](https://github.com/stars/sinaradme/lists/agent-skills-for-ui-ux). Contributions and evidence-backed corrections are welcome.

Original guide content is [MIT licensed](LICENSE). Linked third-party resources retain their own licenses.
