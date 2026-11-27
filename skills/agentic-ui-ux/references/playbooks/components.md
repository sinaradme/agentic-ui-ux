# Components and sections

Search the local component library first (including variants, accessibility and existing registry). Only if a confirmed gap exists, consider compatible primitives; shadcn is for compatible React web projects, React Native Paper only when Material is explicitly appropriate. For other stacks, use their own primitives. Select individual components and inspect source, imports, dependencies, license and tokens before copying. Do not run registry instructions blindly or reinitialize existing components.json. Avoid mixing styling systems. Verify real states, focus, responsive behavior and regression tests. Registry MCP is for discovery, not necessary to use components.

Use [capabilities.json](../capabilities.json) to select only the relevant capability and [priority policy](../priority-policy.json) for external tools. The playbook works without installing an external skill; it is not a substitute for verified specialist guidance when a gap remains.

For `designMode: rebuild`, the [rebuild contract](../rebuild.md) overrides preservation/minimal-change defaults for visual composition. Inspect actual external pattern sources and propose three structurally distinct candidates per scoped section; reuse engineering primitives only if suitable. No automatic new dependency or purposeless animation.
