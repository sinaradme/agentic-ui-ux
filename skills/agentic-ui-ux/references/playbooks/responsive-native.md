# Responsive and native

Use content-driven breakpoints and platform-specific primitives. Check narrow widths, tablet, large screens, long text, RTL if required, zoom and keyboard overlays. For React Native/Expo test safe areas, font scaling, gestures, keyboard and platform navigation on a native device. For Flutter start with SDK layout, Material/Cupertino and animations. Do not use browser screenshots as native evidence. Avoid web-only component or motion dependencies in native projects. Preserve orientation and touch affordances.

Use [capabilities.json](../capabilities.json) to select only the relevant capability and [priority policy](../priority-policy.json) for external tools. The playbook works without installing an external skill; it is not a substitute for verified specialist guidance when a gap remains.
