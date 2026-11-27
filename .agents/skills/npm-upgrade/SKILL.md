---
name: npm-upgrade
description: Use when checking which npm dependencies are outdated, choosing package versions to upgrade, or validating an npm dependency upgrade or dependency PR. Also use when a Node.js or npm version change affects dependency compatibility in an npm project.
---

# Check and validate npm upgrades

Use the repository, its configured registries and its CI as evidence. A published version is a candidate until it passes the project's compatibility and validation checks.

## Identify scope

- **Check** for updates and recommend candidates without changing tracked files or installing dependencies.
- **Validate** an existing candidate as supplied. Use an isolated checkout when a clean install would disturb local work. Confirm it contains the exact candidate, including any relevant uncommitted changes.
- **Upgrade** only when the request authorizes edits. Use the same validation steps for the resulting changes.

Find the npm root and any workspaces. Read their manifests, the committed `package-lock.json` or `npm-shrinkwrap.json`, runtime pins and CI install and check commands. Record the target revision and `node --version` and `npm --version`. Resolve conflicting toolchain evidence before changing versions. If the project uses another package manager, use its workflow and lockfile.

## Check and select versions

1. Run `npm outdated --json --long` from the npm root. For all npm workspaces and the root, add `--workspaces --include-workspace-root`. Keep separate rows for the same package in different workspaces. Exit `1` with valid outdated rows indicates findings. Inspect error output separately. [npm outdated](https://docs.npmjs.com/cli/v11/commands/npm-outdated/)
2. Compare each dependency's declared spec, locked or installed version, in-range `wanted` version and registry `latest` tag. Label the source of each version. When `node_modules` is absent or stale, use the committed lockfile as the baseline. Query candidates with `npm view '<package>@<range>' version --json` and tags with `npm view '<package>' dist-tags --json`. Check omitted entries against the manifests. Record skipped specs, missing resolutions and registry failures as gaps. Use the project's scoped registries for private packages and keep credentials out of output.
3. For each proposed exact version, check metadata such as `npm view '<package>@<version>' version engines peerDependencies peerDependenciesMeta deprecated os cpu --json`. Read the maintainer's release or migration notes for behavior changes. Check peers, Node.js and npm requirements against supported CI and deployment runtimes. Check linked framework or tooling versions together. Use stable releases unless the project tracks a different release channel. [npm view](https://docs.npmjs.com/cli/v11/commands/npm-view/)
4. When advisory review is in scope, use `npm audit --json` with the configured registry if project policy permits sending dependency metadata. Trace a transitive finding with `npm explain <package>` on the relevant installed tree. Prefer a supported update to the owning direct dependency. Record unresolved advisories and unavailable audit results. [npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/)

## Apply and validate

1. Apply one dependency or a related set at a time. Use `npm update <package>` for an in-range refresh or `npm install '<package>@<version>'` for a selected target. Add `--workspace <name>` for a workspace dependency. Add `--package-lock-only --ignore-scripts` to stage changes before a clean install. Preserve the dependency type and pin or range convention. Check manifest and lockfile diffs for the intended resolution, transitive changes and registry sources. Resolve peer or engine conflicts with compatible versions or report a blocker. Avoid `--force`, new `--legacy-peer-deps` flags and bulk `npm audit fix` as shortcuts. [npm update](https://docs.npmjs.com/cli/v11/commands/npm-update/) · [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/)
2. Run the project's CI install command in a clean environment with its pinned toolchain and install flags. Use `npm ci` for a committed npm lockfile. It replaces `node_modules` and checks manifest and lockfile consistency. If there is no committed lockfile, use the project's clean install command and record that limit. A run with `--ignore-scripts` cannot verify behavior that relies on install scripts. Use the project's normal lifecycle policy for that check. [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
3. Verify the resolved version in each affected workspace. Run the project's relevant lint, type, test and build checks plus a smoke check for changed behavior. For native or platform-specific changes, check the supported targets that matter. When a check fails, compare with the base revision under matching conditions where practical. Keep existing edits intact and isolate or revert only this upgrade's changes.

## Report results

List the project and workspaces checked, toolchain, date, and any coverage gaps. For each candidate, give the package, scope, declared and resolved versions, recommended target and any compatibility or advisory finding. For validation, identify the revision or diff tested and record each command and result. Give a verdict of **passed**, **failed** or **incomplete** for each applied or supplied upgrade. Use **incomplete** when required evidence is missing.
