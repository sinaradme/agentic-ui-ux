# Accessibility and performance: routing table

Generated from the canonical registry. [Playbook](../playbooks/accessibility-performance.md) · [Index](../INDEX.md). Apply compatibility, coverage, ownership, budget and priority gates before choosing any provider. A listed provider is not an installation recommendation.

| Capability ID | Need | Role | Stacks | Providers / focused invocation | Gates |
| --- | --- | --- | --- | --- | --- |
| `accessibility-audit` | Keyboard / semantics / accessibility audit | review | react-web, other-web, react-native, flutter | [Impeccable](../tools/impeccable.json) (react-web, other-web; audit) | existing primary only |
| `page-performance` | Page loading / layout stability / rendering | review | react-web, other-web, react-native, flutter | [Impeccable](../tools/impeccable.json) (react-web, other-web; optimize) | existing primary only |
| `browser-diagnostics` | Browser trace / technical diagnostics | tooling | react-web, other-web | [Chrome DevTools MCP](../tools/chrome-devtools-mcp.json) (react-web, other-web) | confirmed gap before external selection |
