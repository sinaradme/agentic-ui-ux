# Curated tools

[Home](README.md) · [Quickstart](QUICKSTART.md)

**Snapshot: 2026-11-27.** GitHub repository metadata was queried directly. Dates are GitHub `pushed_at` dates (UTC), not necessarily release dates or default-branch commit dates. Approximate star counts are a point-in-time adoption signal, not a quality score. Licenses refer to the linked open-source project or specific skill, not paid services or bundled third-party assets.

**For agents:** use the [capability index](skills/agentic-ui-ux/references/INDEX.md), focused route tables and [routing guide](skills/agentic-ui-ux/references/routing.md). The [machine-readable catalog](skills/agentic-ui-ux/references/catalog.json) contains individual source credibility snapshots and trust tiers.

See [how the agent connects a provider](README.md#3-see-what-was-connected). See [actual author examples and demos](EXAMPLES.md) before installing.

The initial catalog uses a 60-day repository-push filter (since 2026-09-28). New or low-adoption entries are explicitly marked exploratory. Every entry remains unbenchmarked here.

## Core options — choose one primary design skill

| Tool / source | Use it for | License | Last push | Stars (approx.) |
| --- | --- | --- | --- | ---: |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) · [site](https://tasteskill.dev) | Visual direction for new marketing websites; references and review guidance | MIT | 2026-11-26 | 122k |
| [Impeccable](https://github.com/pbakaus/impeccable) · [site](https://impeccable.style) | Critique, audit, polishing and improving existing web interfaces | Apache-2.0 | 2026-11-27 | 118k |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Structured design-system and UX planning across supported stacks | MIT | 2026-11-27 | 155k |
| [Hallmark](https://github.com/Nutlope/hallmark) | Alternative visual direction and anti-generic design guidance | MIT | 2026-11-11 | 62k |
| [Anthropic Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Alternative frontend design guidance | Apache-2.0 (specific skill) | 2026-11-16 (parent repo) | 201k (parent repo) |

**Evidence:** reviewed metadata; upstream documentation inspected for the first four; Anthropic skill directory and license checked. No head-to-head runs. Different tools overlap substantially. The official Impeccable comparison and Taste examples were visually inspected in this edition; see [visual examples](EXAMPLES.md).

### Install (choose one)

| Tool | First thing to try after installation |
| --- | --- |
| Taste Skill | Ask for a new hero using the installed skill. [Examples](EXAMPLES.md#taste-skill--two-different-design-directions) |
| Impeccable | Run initialization, then critique one section. [Before/after](EXAMPLES.md#impeccable--official-before--after) |
| UI/UX Pro Max | Ask for a design system for a specific product and audience. [Docs](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| Hallmark | Ask for a visual direction for a focused page. [Examples and docs](https://github.com/Nutlope/hallmark) |
| Anthropic Frontend Design | Ask for a single page with a clear visual direction. [Skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design) |

From your project root, choose the relevant command:

```sh
npx skills add Leonxlnx/taste-skill --skill design-taste-frontend
npx impeccable install
npx skills add Nutlope/hallmark
npx skills add anthropics/skills --skill frontend-design
```

For UI/UX Pro Max, use the [documented CLI setup](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill). The Anthropic command uses the skills CLI's standard syntax; verify the skill list before installing.

## Motion and polish — optional

| Tool / source | Use it for | License | Last push | Stars (approx.) |
| --- | --- | --- | --- | ---: |
| [Emil's skills](https://github.com/emilkowalski/skills) | Focused guidance: animate, animate-expo, choreograph, gestures, animation-performance, review-animations | MIT | 2026-11-15 | 60k |
| [Motion (core)](https://github.com/motiondivision/motion) | React web runtime for complex scroll, gesture and layout animation; only when existing CSS/runtime is insufficient | MIT core | 2026-11-26 | 35.6k |
| [Make Interfaces Feel Better](https://github.com/jakubkrehel/make-interfaces-feel-better) | Small interaction and visual-detail refinements | MIT | 2026-11-18 | 4.3k |
| [Stageshow](https://github.com/benjitaylor/skills/tree/main/stageshow) | React-based product illustrations and motion demos, not a full app UI system | MIT (skill; see notices) | 2026-11-05 (parent repo) | 4.2k (parent repo) |

```sh
npx skills add emilkowalski/skills --skill animate
# Or, for React Native / Expo:
npx skills add emilkowalski/skills --skill animate-expo
npx skills add benjitaylor/skills --skill stageshow
npx skills add jakubkrehel/make-interfaces-feel-better --list
```

These commands are independent alternatives, not a bulk install. Use the [motion routing table](skills/agentic-ui-ux/references/routes/motion.md) for precise skill selection; the router also checks existing runtime inventory. Select only relevant skills from a listed collection; check upstream setup if the CLI does not recognize it. Treat demo animations as inspiration, not mandatory effects.

## UI components and registries

| Tool / source | Use it for | License | Last push | Stars (approx.) |
| --- | --- | --- | --- | ---: |
| [shadcn/ui](https://github.com/shadcn-ui/ui) · [docs](https://ui.shadcn.com) | React web component primitives and registry workflows | MIT | 2026-11-26 | 129k |
| [Magic UI](https://github.com/magicuidesign/magicui) · [site](https://magicui.design) | Selective animated React web effects from the free repository | MIT | 2026-11-26 | 24k |
| [Motion UI Skill](https://github.com/Rkj0123/motion-ui-skill) | Agent-readable React/Next.js motion and component catalog | MIT | 2026-11-20 | 7 |
| [Fancy UI](https://github.com/RamaHerbin/fancy-ui) | Animated components; confirm the target framework in its current docs | MIT | 2026-11-27 | 25 |

The last two are **exploratory** due to limited adoption. Do not infer maturity, accessibility or integration quality from catalog size. Motion UI Skill documents `npx motion-ui-skill` for skill setup and separate component-copy commands. Read its upstream docs and review the installer before using it. Magic UI's paid offerings are outside this guide's scope.

## Browser inspection and QA

| Tool / source | Use it for | License | Last push | Stars (approx.) |
| --- | --- | --- | --- | ---: |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Browser interaction, screenshots and functional checks | Apache-2.0 | 2026-11-18 | 40k |
| [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Browser diagnostics and performance investigation | Apache-2.0 | 2026-11-27 | 60k |

Choose one browser path to start; existing automation is sufficient if it covers the required checks. Neither tool is an autonomous design critic. See [setup](QUICKSTART.md#check-the-result).

## Reference catalogs — exploratory

[Landing Page Atlas](https://github.com/vezeqs/landing-page-atlas) — MIT; pushed 2026-10-31; zero stars at snapshot. The README is now accessible and describes 60 complete HTML/CSS/JavaScript landing pages across ten visual families. [Browse live pages](https://vezeqs.github.io/landing-page-atlas/). Treat as a candidate, not an endorsed reference. Never copy design assets without checking rights.

Discovery directories: [skills.sh](https://skills.sh), [shadcn registry docs](https://ui.shadcn.com/docs/registry). Directory listings are leads, not automatic approvals.

## How to choose

When invoking the skill, use its [reviewed upstream knowledge cards](skills/agentic-ui-ux/references/knowledge/INDEX.md) and [source-grounding contract](skills/agentic-ui-ux/references/grounding.md). Select the exact documented pattern or component rather than inventing a visual style.

Start with the tool addressing your actual bottleneck. If the interface is visually generic, choose art direction. If usability is weak, choose structured UX guidance. If interactions are rough, add a targeted motion skill. If the agent cannot inspect its work, add browser access before adding another design skill.

The catalog uses preferred, specialized, alternative and exploratory tiers. These are task-fit policies, not an overall quality leaderboard. Existing compatible tools take precedence; specialized candidates must match a specific gap, and exploratory candidates are not automatically installed. The router blocks new candidates when their metadata snapshot is stale relative to the request date. A tool earns a stronger recommendation through reproducible evaluations, not GitHub popularity or vendor demonstrations. See [benchmark protocol](benchmarks/README.md).

## Source and refresh policy

All source links are upstream. Metadata source: GitHub REST repository endpoint, `https://api.github.com/repos/{owner}/{repo}`. Stageshow and Anthropic Frontend Design have skill-specific license files. Recheck licenses, latest releases, default-branch activity, installation docs and unresolved issues before any production adoption. Review the catalog monthly or when significant upstream changes occur. Remove archived/stale projects from the active list, but preserve their evaluation history.
