# Visual examples

[Home](README.md) · [Choose a tool](TOOLS.md) · [Quickstart](QUICKSTART.md)

Look at the designs before installing a tool. These examples come from the tool authors. They show possible outcomes, not typical results or independent tests.

## Impeccable — official before / after

**Task:** A landing page for a family-run guesthouse. The author reports the same Fable 5.1 model and brief with and without the skill.

| Without skill | With skill |
| --- | --- |
| [![Light guesthouse layout with serif text and a rectangular illustration](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-without.webp)](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-without.webp) | [![Dark guesthouse layout with an orange headline and full-screen coastal illustration](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-with.webp)](https://raw.githubusercontent.com/pbakaus/impeccable/2fc5e1459efbbf06d92c7306517c286bf12490cf/docs/images/readme-with.webp) |

**What to notice:** The second page has a more unified visual concept: one dominant illustration, stronger contrast and a clear headline. The first is a more conventional layout. The screenshot alone does not establish usability, conversion, accessibility or code quality.

**Try:** Run `npx impeccable install` in your project, initialize the skill, and ask `/impeccable critique the hero section` (adapt invocation for your agent).

[Original README](https://github.com/pbakaus/impeccable/tree/2fc5e1459efbbf06d92c7306517c286bf12490cf) · [Full case study](https://impeccable.style/cases/neo-mirai) · [Docs](https://impeccable.style/docs)

## Taste Skill — two different design directions

| Coffee shop | Event calendar |
| --- | --- |
| [![Coffee shop with bold typography and drawn storefront](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/coffee-storefront.webp)](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/coffee-storefront.webp) | [![Club event dates arranged within a cyan photographic grid](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/night-dates.webp)](https://raw.githubusercontent.com/Leonxlnx/taste-skill/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2/night-dates.webp) |

**What to notice:** The coffee shop uses an illustrated storefront and large typographic treatment. The event page turns its background image and date grid into the main composition. Each uses a different visual language suited to its content.

These are two examples from the author's gallery, not matched before/after results.

**Try:** `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend`. Ask the agent to build a single landing page for your product, using your own assets and design requirements.

[Original example gallery](https://github.com/Leonxlnx/taste-skill/tree/952435f63acece7d2fcb4b4d3c1786c1c43603e0/examples/v2) · [Website](https://tasteskill.dev)

## shadcn/ui — product components

[![Official shadcn/ui component preview](https://raw.githubusercontent.com/shadcn-ui/ui/0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4/apps/v4/public/opengraph-image.png)](https://ui.shadcn.com)

This is the project's own promotional preview, not a generated app or a before/after test. Use the component docs to inspect individual UI primitives before adopting them.

[Component examples](https://ui.shadcn.com/docs/components) · [Source README](https://github.com/shadcn-ui/ui/tree/0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4)

## Magic UI — animated components

[![Official Magic UI animated bento grid](https://cdn.magicui.design/bento-grid.gif)](https://magicui.design)

Use individual effects only when they help communicate something. Check performance, reduced-motion behavior and the project's license before adoption. The GIF is the project's official library preview, not an independent motion benchmark.

[Official README](https://github.com/magicuidesign/magicui) · [Interactive docs](https://magicui.design/docs)

## Motion examples — watch the actual interactions

Static images cannot demonstrate easing, gesture handling or performance.

- [Emil's skill gallery](https://aiforui.dev/skills): examples and suggested prompts for each skill.
- [Emil's Expo animation skill](https://aiforui.dev/skills/animate-expo): native gestures, sheets and transitions.
- [Stageshow](https://github.com/benjitaylor/skills/tree/main/stageshow): product illustrations and animation examples.
- [Landing Page Atlas live catalog](https://vezeqs.github.io/landing-page-atlas/): complete page references to browse.

## Evidence and credits

The four Impeccable/Taste screenshots were retrieved and visually inspected on November 27, 2026. They are linked to specific upstream revisions to reduce link drift. The shadcn preview and Magic UI GIF are linked from their official READMEs; the Magic UI asset is externally hosted and may change. These promotional examples are not independently reproduced here.

All images remain hosted by their creators. Their inclusion does not imply endorsement or permission to reuse them in commercial projects. Check individual asset rights.

Independent benchmark results: [not yet published](benchmarks/README.md). To contribute a reproducible before/after, use the [run template](benchmarks/run-template.md).
