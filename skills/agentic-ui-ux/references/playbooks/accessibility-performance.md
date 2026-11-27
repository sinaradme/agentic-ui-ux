# Accessibility and performance

Check semantic roles/labels, keyboard reachability, focus visibility, contrast, text scaling, reduced motion and error messages. Automated audits help but do not replace interaction checks or a screen-reader review where available. Identify actual performance bottlenecks before optimizing; inspect traces or measurements, not guesses. Use existing tooling, then Chrome DevTools only for a confirmed diagnostic gap. Treat Impeccable audit/optimize as review guidance, not proof of compliance. Report untested conditions and avoid claiming WCAG conformance without appropriate evidence.

Use [capabilities.json](../capabilities.json) to select only the relevant capability and [priority policy](../priority-policy.json) for external tools. The playbook works without installing an external skill; it is not a substitute for verified specialist guidance when a gap remains.
