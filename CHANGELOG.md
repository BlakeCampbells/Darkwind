# Changelog

Notable changes to Darkwind are recorded here.

## [1.0.2] - 2026-11-07

### Fixed

- Replaced unsupported font-style resets and made selection, merge, and minimap overlays translucent so they preserve underlying decorations.
- Removed a C# label scope from the Markdown heading rule so labels use the C# color.
- Removed redundant syntax scopes and normalized selector whitespace while preserving the remaining effective colors.

### Added

- Modern indentation guide colors alongside legacy fallbacks for older VS Code versions.
- Theme validation tests and a repeatable VSIX packaging workflow.
- MIT license and Marketplace metadata for discovery and support.

### Changed

- Replaced README template sections with installation, development, and contribution guidance.
- Removed the generated extension quickstart and restricted package contents to distribution files.

## [1.0.1] - 2024-07-15

- Added the extension icon to the manifest.
