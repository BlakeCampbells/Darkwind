# Changelog

Notable changes to Darkwind are recorded here.

## [1.0.3] - 2026-11-14

### Changed

- Sharpened the existing two-wave icon and recolored it with Darkwind's navy, cyan, and blue.
- Matched the Marketplace banner to the navy editor background.
- Replaced the README's older screenshots with five fresh VS Code captures of HTML, JavaScript, Ruby, Python, and TypeScript.

### Added

- A visual palette and a color reference with exact hex values and their editor and syntax roles, included in the Marketplace overview.
- Packaged screenshot and palette PNGs, plus reproducible source examples in the repository.

The theme's editor and syntax color definitions are unchanged.

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
