# React Native and Flutter

[Home](README.md) · [Workflows](WORKFLOWS.md)

The workflow stays the same: brief → design → build → render → inspect → refine. The implementation and device verification tools change.

| Layer | React web | React Native | Flutter |
| --- | --- | --- | --- |
| Design direction | Web design skill | Portable UX principles, adapted to native | Portable UX principles, adapted to native |
| Components | Existing UI system, shadcn/ui | Existing native UI system or React Native Paper | Flutter Material/Cupertino widgets |
| Motion | CSS/Motion or existing library | Animated/Reanimated | Flutter implicit and explicit animations |
| Visual checks | Browser screenshots | Android/iOS device or emulator screenshots | Android/iOS device or emulator screenshots, golden tests |
| Functional tests | Playwright or existing framework | Native integration/E2E tools | Widget and integration tests |

Do not install shadcn web components, React DOM, browser-only CSS effects or web animation packages into a native project merely because a web guide recommends them. React Native's web target is not a substitute for testing native behavior.

## React Native path

Start with your existing design tokens and components. For new UI primitives, consider [React Native Paper](https://github.com/callstack/react-native-paper) if its Material Design approach suits the product. For complex native motion consider [Reanimated](https://github.com/software-mansion/react-native-reanimated), following [current compatibility and installation docs](https://docs.swmansion.com/react-native-reanimated/). Expo projects should use compatible packages and Expo's documented installation procedures.

For device-level flows consider [Maestro](https://github.com/mobile-dev-inc/Maestro), or your existing native E2E tool. Use real emulator/device screenshots to verify safe areas, font scaling, keyboard appearance, touch targets, platform navigation and motion. Browser-only MCP is not sufficient.

## Flutter path

Start with [Flutter widgets](https://docs.flutter.dev/ui/widgets) and the existing theme. Use [built-in animations](https://docs.flutter.dev/ui/animations) before adding packages. Follow [Flutter testing docs](https://docs.flutter.dev/testing/overview) for widget and integration tests; use golden comparisons where appropriate and test on target devices. For iOS-specific conventions use Cupertino widgets where justified.

## Open-source resource snapshot

GitHub metadata checked 2026-11-27; no comparative native testing performed.

| Resource | License | Last repository push (UTC) | Approx. stars |
| --- | --- | --- | ---: |
| [React Native Paper](https://github.com/callstack/react-native-paper) | MIT | 2026-11-25 | 14.5k |
| [Reanimated](https://github.com/software-mansion/react-native-reanimated) | MIT | 2026-11-27 | 11k |
| [Maestro](https://github.com/mobile-dev-inc/Maestro) | Apache-2.0 | 2026-11-26 | 16.5k |
| [Flutter SDK](https://github.com/flutter/flutter) | BSD-3-Clause | 2026-11-27 | 182k |

A dedicated native-agent skill comparison remains open. UI/UX Pro Max may offer useful cross-platform planning guidance, but its native implementation quality is not established by this guide.

## Prompt

> Identify the actual native framework and platform targets. Use the existing native design system and platform conventions. Do not introduce web-only component or motion dependencies. Implement the screen, run native builds or emulators where available, inspect screenshots, and verify key touch, accessibility and keyboard states. Clearly distinguish Android, iOS and web evidence.
