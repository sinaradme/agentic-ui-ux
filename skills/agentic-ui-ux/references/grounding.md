# Source-grounded design contract (mandatory when this skill is invoked)

**Mode first.** For rebuild, the [rebuild contract](rebuild.md) overrides visual-preservation defaults in this file: existing layout is a baseline, not a visual authority, and explicit structural redesign authorizes source-grounded exploration inside the requested scope. The requirements below prohibit arbitrary or uninspected design, not creative reconstruction. No arbitrary aesthetic, ungrounded layout, random effects or model-preferred styling. New combinations of documented patterns are encouraged in rebuild mode. Use the user's approved reference, the project's established design system and existing patterns, or a specific reviewed upstream design/example/documented rule. The agent may adapt, combine compatible documented patterns, and implement them to meet the brief; it must not substitute personal/model taste for those sources. User/project constraints outrank external style rules.

## Source hierarchy

1. Explicit user requirements, approved reference and brand/design files.
2. Actual project tokens, components, conventions and accepted screens (visual authority only when preserved by the brief; otherwise engineering inputs and baseline in rebuild mode).
3. Relevant documented design pattern or specific official example from the routed source. Read the exact reference, not a title or a generic homepage. For a component or API use the specific official item page under a reviewed documentation scope, and record its actual version/revision and relevant section. A scope is only an allowlisted retrieval path, not proof all its pages were reviewed. Use [knowledge cards](knowledge/INDEX.md) for retrieval, then the pinned source and relevant current/version-specific official docs.
4. Bundled playbook for scoped engineering rules and QA. It is not by itself a visual reference for a novel look.

Do not copy proprietary assets or a distinctive third-party brand identity. Adapt the pattern, not the identity. Never fabricate examples, API names, design tokens, licenses, reference inspection or approval. A source may be inaccessible, stale or incompatible; mark the requirement blocked or ask once for the missing reference/approval. Do not silently downgrade to a generic design. For exploration outside available references, obtain explicit user permission; a delegated rebuild already authorizes selecting and adapting inspected patterns without per-concept approval. Do not treat absence of an exact matching reference as a prohibition on new source-grounded compositions.

## Required design evidence

Before editing visual implementation, create a compact decision record for each material capability and each affected surface (page/section/component). It must say exactly what source was inspected (path/URL + section/item and version/revision if relevant), what was taken from it, how the adaptation respects the brief and current system, and what will verify it. Use one primary art-direction owner. No need to ask the user to select libraries. Ask only if a material source/approval gap remains; routine source-grounded adaptation within the authorized task needs no additional permission.

Do not mistake installing a tool, reading a card or passing the router for following its guidance. Read actual upstream content, select the exact command, item or documented recipe, and verify in the project. A screenshot is not an animation or functional test. A source card is a discovery summary, not a substitute for the exact source.

## Before editing and before declaring completion

Use [grounding.example.json](grounding.example.json) and `node <skill-directory>/scripts/check-grounding.mjs <record.json>` where available. With a read-only connection apply the same checklist manually. The gate checks coverage, source types, locators, scope and evidence structure. It cannot prove a model really read a source, verify arbitrary URLs/project files, or judge aesthetic similarity. Do not label structural validation as visual verification.

For the preflight record, every material core and supporting route needs a decision; blocked/not-applicable needs a reason and remains visible. Every affected surface needs a traceable visual source. For final acceptance record actual screenshot/interaction/test evidence or an explicit blocker. Every verification entry requires a status (pass, fail, blocked), evidence location and concrete result. Any failed or blocked verification prevents a passing final record. If a material decision is unsupported, do not edit that part or mark it complete. Preserve business logic, accessibility and platform conventions.

### Final record checklist

Use the updated final request after re-inspecting approved installed tools, not the original install proposal. Resolve unknown coverage and confirm actual browser/device access. Final records require `acceptance` entries (id, status, location, result) for rendered-ui, functional, accessibility, responsive-or-native and build-or-validation; add dynamic-interaction for motion/interaction and performance for performance/diagnostics tasks. For UX planning use brief and design-system instead of rendered checks. A build-or-validation check may be a relevant static validation for plain HTML. A pass requires actual evidence; if any mandatory check cannot run, mark blocked, not pass. Also include `toolVerification` entries (id, status, revision, location, result) for every selected tool after re-routing to reuse; use an empty array only when no tool is selected. These are structural checks on agent-supplied evidence, not proof the evidence is genuine.

For a complete record shape, see [synthetic final example](grounding.final.example.json). It is a fixture, not real project evidence. Replace every synthetic value with actual inspected evidence.

## Structural redesign exception to legacy preservation defaults

When designMode is rebuild, the old design system/layout is baseline only except for explicit user/brand/functional constraints. Source-grounded does not mean conservative or copying: derive materially different compositions from inspected references and select the best task-fit option. The user request for structural redesign authorizes that exploration within scope; no extra per-concept approval unless a material permission or constraint is missing. In addition to ordinary grounding decisions the record must include `rebuild` per [rebuild.md](rebuild.md). Project-only sources cannot satisfy the rebuild gate. Read-only external reference access is separate from installation; it is mandatory even if no new dependencies are needed.
