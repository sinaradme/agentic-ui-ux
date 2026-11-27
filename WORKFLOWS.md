# Workflows

[Home](README.md) · [Quickstart](QUICKSTART.md)

Choose one workflow. Start each prompt with `Use the agentic-ui-ux skill and its mandatory source-grounding contract.` The listed tools are candidates for the router, not installation instructions. Copy the prompt into your coding agent after opening your actual project. The prompts are original templates, not proof of superior results. See [visual examples](EXAMPLES.md) if you are unsure what to aim for.

## New landing page

Starting candidate: Taste Skill; use the existing component system, with selective additions only if justified.

> Inspect the repository and identify its framework, existing UI system, tokens and constraints. Use the installed design skill to define a clear visual direction for [product] and [audience]. Plan a cohesive narrative and varied section compositions rather than a generic card grid. Build a responsive vertical slice; use meaningful motion only where it supports understanding. Render the result at desktop and mobile sizes, inspect the screenshots, correct issues and document remaining limitations. Do not change unrelated functionality.

## Existing product or dashboard

Starting candidate: Impeccable or UI/UX Pro Max if the bottleneck is UX planning. Preserve established design language.

> Review the existing screens, user goals, component library and design tokens. Capture baseline screens before changes. Identify and prioritize hierarchy, spacing, typography, accessibility and interaction issues. Propose a focused improvement, then implement it without changing business logic or introducing unnecessary dependencies. Verify loading, empty, error, success and disabled states. Compare before and after screenshots and report unresolved issues.

## Motion and interaction

Optional candidate: Emil's skills. Use the project's existing animation mechanism first.

> Inspect current interactions and identify specific problems in feedback, transition continuity or responsiveness. Add only motion that clarifies state or helps orientation. Define duration and easing intentionally; account for interrupted gestures and reduced-motion preferences. Verify performance and keyboard/touch behavior. Record what you inspected and what was not measured.

## Persistent project instructions

Copy this into an existing AGENTS.md (merge with project-specific instructions rather than replacing them):

```md
## Design engineering
- Respect product requirements and the existing design system.
- Select at most one primary design-direction skill per task.
- Add a specialized skill only for a named gap.
- Ground typography, spacing, color, layout and interaction decisions in inspected project/user references or documented upstream patterns.
- Reuse existing primitives; justify any new dependency.
- Keep existing behavior, routes, APIs and accessibility intact.
- Render and inspect actual UI before claiming visual completion.
- Check responsive/device layouts, states, focus, contrast and motion.
- Fix significant issues; document remaining failures and missing evidence.
- Never describe an unexecuted check as passed.
```

## Acceptance checklist

- [ ] Every material design decision has a traceable inspected source.
- [ ] Design matches the brief and has a coherent visual direction.
- [ ] Existing components and tokens are respected.
- [ ] Desktop/mobile layouts (or native device sizes) are inspected.
- [ ] Main controls and navigation work; keyboard/touch paths are checked.
- [ ] Contrast, focus, semantic labels and reduced motion are considered.
- [ ] Loading, empty, error and long-content states are checked where relevant.
- [ ] Motion is intentional and does not obstruct critical actions.
- [ ] Build/test results, screenshots and unresolved issues are recorded.

If a check cannot be performed, mark it blocked or not applicable with a reason. Do not silently convert missing evidence into a pass.
