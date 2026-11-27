# Components and sections: routing table

Generated from the canonical registry. [Playbook](../playbooks/components.md) · [Index](../INDEX.md). Apply compatibility, coverage, ownership, budget and priority gates before choosing any provider. A listed provider is not an installation recommendation.

| Capability ID | Need | Role | Stacks | Providers / focused invocation | Gates |
| --- | --- | --- | --- | --- | --- |
| `component-primitives` | Reusable UI primitives | implementation | react-web | [shadcn/ui](../tools/shadcn.json) (react-web) | confirmed component gap |
| `section-blocks` | Reusable page sections / blocks | implementation | react-web | [shadcn/ui](../tools/shadcn.json) (react-web) | confirmed component gap |
| `native-components` | Native Material component system | implementation | react-native | [React Native Paper](../tools/rn-paper.json) (react-native) | confirmed component gap; explicit Material fit |
| `component-discovery` | Find existing registry items | tooling | react-web | [shadcn MCP](../tools/shadcn-mcp.json) (react-web) | requires shadcn |
