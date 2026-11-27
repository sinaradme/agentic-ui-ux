# Layout and composition

Sketch one representative screen with explicit hierarchy and content order. Define container widths, responsive grid, gutters, line lengths and spacing rhythm using existing tokens. Prefer composition driven by content; do not make every section a symmetrical card grid. Dashboards require density, readable tables and stable navigation; landing pages need narrative and a clear main action. Check long copy, missing images, resizing and overflow at target widths. Reuse an existing block if it fits; do not install an entire registry for one section. Compare screenshots before/after for refinements.

Use [capabilities.json](../capabilities.json) to select only the relevant capability and [priority policy](../priority-policy.json) for external tools. The playbook works without installing an external skill; it is not a substitute for verified specialist guidance when a gap remains.

For `designMode: rebuild`, the [rebuild contract](../rebuild.md) overrides preservation/minimal-change defaults for visual composition. Inspect actual external pattern sources and propose three structurally distinct candidates per scoped section; reuse engineering primitives only if suitable. No automatic new dependency or purposeless animation.
