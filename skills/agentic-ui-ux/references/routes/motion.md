# Motion engineering: routing table

Generated from the canonical registry. [Playbook](../playbooks/motion.md) · [Index](../INDEX.md). Apply compatibility, coverage, ownership, budget and priority gates before choosing any provider. A listed provider is not an installation recommendation.

| Capability ID | Need | Role | Stacks | Providers / focused invocation | Gates |
| --- | --- | --- | --- | --- | --- |
| `micro-interactions` | Hover / press / state transitions | guidance | react-web, other-web, react-native, flutter | [Emil: animate](../tools/emil-web.json) (react-web, other-web; animate); [Emil: animate-expo](../tools/emil-native.json) (react-native; animate-expo) | confirmed gap before external selection |
| `choreography` | Coordinated multi-element motion | guidance | react-web, other-web, react-native, flutter | [Emil: choreograph](../tools/emil-choreograph.json) (react-web, other-web; choreograph); [Emil: animate-expo](../tools/emil-native.json) (react-native; animate-expo) | confirmed gap before external selection |
| `scroll-motion` | Scroll-linked motion / sticky narrative | guidance | react-web, other-web | [Emil: animate](../tools/emil-web.json) (react-web, other-web; animate) | confirmed gap before external selection |
| `layout-transitions` | Shared layout / presence transitions | guidance | react-web, other-web, react-native, flutter | [Emil: animate](../tools/emil-web.json) (react-web, other-web; animate); [Emil: animate-expo](../tools/emil-native.json) (react-native; animate-expo) | confirmed gap before external selection |
| `complex-web-runtime` | Complex web motion runtime gap | implementation | react-web | [Motion (open-source core)](../tools/motion-web.json) (react-web) | advanced + runtime inventory none |
| `complex-native-runtime` | Complex React Native runtime gap | implementation | react-native | [Reanimated](../tools/reanimated.json) (react-native) | advanced + runtime inventory none |
| `motion-review` | Review existing animation quality | guidance | react-web, other-web, react-native, flutter | [Emil: review-animations](../tools/emil-review.json) (react-web, other-web; review-animations); [Emil: animate-expo](../tools/emil-native.json) (react-native; animate-expo) | confirmed gap before external selection |
| `motion-performance` | Animation performance / dropped frames | guidance | react-web, other-web, react-native, flutter | [Emil: animation-performance](../tools/emil-performance.json) (react-web, other-web; animation-performance); [Emil: animate-expo](../tools/emil-native.json) (react-native; animate-expo) | confirmed gap before external selection |
