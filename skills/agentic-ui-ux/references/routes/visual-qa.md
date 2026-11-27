# Visual QA and refinement: routing table

Generated from the canonical registry. [Playbook](../playbooks/visual-qa.md) · [Index](../INDEX.md). Apply compatibility, coverage, ownership, budget and priority gates before choosing any provider. A listed provider is not an installation recommendation.

| Capability ID | Need | Role | Stacks | Providers / focused invocation | Gates |
| --- | --- | --- | --- | --- | --- |
| `visual-review` | Rendered visual critique / finish | review | react-web, other-web, react-native, flutter | [Impeccable](../tools/impeccable.json) (react-web, other-web; critique / polish) | existing primary only |
| `browser-inspection` | Real browser screenshots and interaction | tooling | react-web, other-web | [Playwright MCP](../tools/playwright-mcp.json) (react-web, other-web) | confirmed browser absence |
| `device-inspection` | Real native device screenshots | tooling | react-native, flutter | Bundled / project | confirmed native device |
| `native-e2e` | Native end-to-end testing | tooling | react-native, flutter | [Maestro](../tools/maestro.json) (react-native, flutter) | confirmed native device |
| `functional-regression` | Existing flows / regression checks | review | react-web, other-web, react-native, flutter | Bundled / project | confirmed gap before external selection |
