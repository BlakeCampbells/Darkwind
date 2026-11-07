# Extension Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up Darkwind's theme definitions and release workflow without adding runtime dependencies.

**Architecture:** Keep the extension declarative. Use Node's built-in test runner for theme validation and a pinned development dependency on VS Code's packaging tool.

**Tech Stack:** JSON, Node.js tests, @vscode/vsce.

**Spec:** The user's approved cleanup recommendations in this chat, including their selection of MIT licensing.

## Global Constraints

- Preserve the extension identifier `BlakeDev.darkwind`, theme label `Darkwind`, and VS Code minimum `^1.56.0`. The user subsequently requested version `1.0.2` for release preparation.
- Retain the existing effective syntax colors except for removing the misplaced C# label scope from the Markdown rule.
- Keep legacy indentation colors alongside their modern equivalents for older VS Code versions.
- Preserve the README work and all existing screenshots.
- Work in the current checkout. The user subsequently authorized Marketplace publication of version `1.0.2`, followed by committing the release changes and pushing them to GitHub. Visual checks may install the package into temporary test profiles as authorized by the user.
- Add the user-selected MIT license, attributed to Blake Campbell.

## Review Focus

- Removing duplicate scopes must retain the winning color and avoid changing more-specific selectors.
- Both legacy and modern indentation settings must retain the existing palette.
- Development tooling must stay out of the installable VSIX.
- Changelog history must reflect repository evidence, without inventing past changes.
- Packaging instructions must distinguish Node.js tooling requirements from VS Code runtime compatibility.

## Task 1: Validate and clean theme definitions

- [x] Add built-in Node tests for loadable theme registration, valid color values, unambiguous scopes, language-specific grouping, and compatible indentation settings.
- [x] Run `node --test` before editing the theme; confirm duplicate scopes, the misplaced C# scope, and missing modern indentation colors fail. Result: 2 passed, 4 failed for the expected issues.
- [x] Normalize scope whitespace, remove redundant scopes, preserve the last effective color for LESS operators and embedded punctuation, and remove C# labels from the Markdown rule.
- [x] Add modern indentation settings while retaining legacy fallbacks; align the internal theme name with its registered label.
- [x] Run `node --test`; expect all checks to pass. Result: 6 passed.

## Task 2: Prepare release metadata and packaging

- [x] Add MIT licensing, useful Marketplace metadata, pinned packaging tooling, and npm scripts that validate before packaging.
- [x] Replace template changelog text with an Unreleased cleanup entry and repository-backed version history; remove the generated quickstart.
- [x] Restrict the VSIX to distribution files, and document validation and packaging commands in the README.
- [x] Install tooling, run `npm test`, list package contents, build a VSIX, and inspect the archive. Results: 6 tests passed; archive has exactly 8 expected entries; packaged manifest, theme, and license match source; VSIX XML is valid. A clean `npm ci --ignore-scripts` also succeeded.
- [x] Review the full changes and run `git diff --check`. Independent read-only review found no actionable issues, and the whitespace check passed. Changes remain uncommitted for the user's review.

## Verification Notes

- Compared all 408 unique syntax scopes against HEAD: none were lost, and only the intended C# label color changed. Semantic colors are unchanged. The later transparency fix changes only alpha on the nine flagged workbench overlays.
- Verified every local README link and the pinned packaging dependency in the lockfile.
- The VSIX excludes development dependencies, tests, the launch configuration, planning documents, and the lockfile.
- Packaging and static checks passed. A visual check in VS Code 1.145.0 was subsequently completed in an Extension Development Host using a temporary profile.

## Visual Check — 2026-11-07

- Inspected TypeScript, C#, LESS, HTML with embedded JavaScript, Ruby, and Markdown samples, plus editor indentation guides, tabs, breadcrumbs, the sidebar, and Find controls.
- VS Code's token inspector confirmed `entity.name.label.cs` renders as `#059669` on `#111827`, with a reported contrast ratio of 4.71.
- Found two unsupported `fontStyle: "normal"` values in the attribute ID and CSS class rules. VS Code expects an empty string to reset font styling.
- Found nine colors flagged by VS Code as requiring transparency: inactive selection background, six merge backgrounds, and two minimap highlights. No theme colors were changed during this initial visual check; the user subsequently authorized the fixes in Task 3.
- The two deprecated indentation keys are intentionally retained for compatibility alongside their modern equivalents.
- The preview ran in Restricted Mode. Git decoration schema warnings in that profile were kept separate from the theme warnings above.

## Task 3: Fix visual-check findings and recheck the package

- [x] Extend validation for supported font styles and visible, translucent overlays; reproduce the two failures before changing the theme. Result: 6 passed and 2 failed for the expected issues.
- [x] Replace the two `normal` styles with empty resets. Preserve RGB hues, using approximately 50% opacity (`80`) for inactive selection, merge headers, and minimap overlays, and 25% (`40`) for merge content overlays.
- [x] Record the fixes in the changelog, rebuild the VSIX, and verify its theme matches source. Result: all 8 checks passed; the archive has exactly the 8 expected entries and its theme matches source byte for byte.
- [x] Load the rebuilt package into a temporary VS Code preview and recheck font styling, inactive selection, merge overlays, minimap highlights, and schema diagnostics.

### Recheck Results

- Loaded the extension extracted from the rebuilt VSIX into a fresh temporary Extension Development Host.
- Confirmed plain CSS ID/class selectors, readable current/base/incoming merge content, inactive selection layered over a merge background, and visible minimap selection/search highlights.
- VS Code no longer reports either unsupported font-style values or any of the nine opaque overlay warnings. The remaining 11 diagnostics are two intentional legacy indentation deprecations and nine Git color warnings caused by Restricted Mode disabling Git.
- Independent read-only review found no actionable issues; all 8 checks and `git diff --check` passed.

## Task 4: Prepare version 1.0.2 for release

- [x] Bump the manifest and root lockfile version to `1.0.2` without creating a Git tag or running release hooks.
- [x] Move completed changes into the dated `1.0.2` changelog entry for 2026-11-07 and remove the stale README package filename.
- [x] Rebuild the VSIX, run all checks, and verify release identity, source contents, and archive metadata. All 8 checks passed. The manifest, lockfile, changelog, and VSIX identity agree on `1.0.2`; the archive contains exactly 8 expected entries and matches source, including expected README link rewriting.

### Release Package

- Artifact: `darkwind-1.0.2.vsix`.
- Installed successfully into a separate temporary VS Code extension directory; the CLI reports `blakedev.darkwind@1.0.2`.
- SHA-256: `bd9bc3227354edf03e860bea3005edb070dac43d2da1533cb3c29d22d2aeb307`.
- The release retains the visually checked theme; this step changes release metadata and documentation only. No Git commit, tag, push, or Marketplace publication was performed.

## Task 5: Publish version 1.0.2

- [x] Receive explicit user authorization to publish `BlakeDev.darkwind` version `1.0.2`.
- [x] Rerun all 8 checks and confirm the prepared VSIX has the recorded SHA-256 and release identity.
- [x] Authenticate to the existing `BlakeDev` publisher account. GitHub sign-in reached the existing publisher dashboard and confirmed the user has the Owner role. No new developer profile was created.
- [x] Upload the verified VSIX. Marketplace accepted `darkwind-1.0.2.vsix` and shows version `1.0.2` as Verifying.
- [x] Wait for Marketplace validation and confirm the released version is available. On 2026-11-07, the publisher dashboard showed `1.0.2` as Public with no pending validation, and the public Marketplace catalog independently listed `1.0.2` as the latest version.

### Published Release

- Marketplace: https://marketplace.visualstudio.com/items?itemName=BlakeDev.darkwind
- Published package: `darkwind-1.0.2.vsix`, SHA-256 `bd9bc3227354edf03e860bea3005edb070dac43d2da1533cb3c29d22d2aeb307`.
- Publication used the existing publisher's browser dashboard; no publishing token or new developer profile was created.
