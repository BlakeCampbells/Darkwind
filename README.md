# Darkwind

A dark theme for Visual Studio Code inspired by Tailwind's color palette. Darkwind pairs a deep gray background with colorful syntax highlighting, with readability in mind.

[Install from the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=BlakeDev.darkwind)

## Installation

Requires Visual Studio Code 1.56.0 or later.

1. Open the **Extensions** view in VS Code.
2. Search for **Darkwind** by **BlakeDev** and select **Install**.
3. Open the Command Palette with `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).
4. Run **Preferences: Color Theme** and select **Darkwind**.

You can also select the theme in your `settings.json`:

```json
{
  "workbench.colorTheme": "Darkwind"
}
```

## Screenshots

### Component HTML

<img width="860" alt="Component HTML syntax highlighting in Darkwind" src="https://github.com/user-attachments/assets/a1e6b1a0-206b-4af1-a031-79045361409f">

### JavaScript

<img width="772" alt="JavaScript syntax highlighting in Darkwind" src="https://github.com/user-attachments/assets/72b2b68d-52d4-41a0-a2f0-668643bd4a8b">

### Ruby

<img width="642" alt="Ruby syntax highlighting in Darkwind" src="https://github.com/user-attachments/assets/cfb963ac-0c91-4063-a76d-9b28f94e69aa">

## Development

1. Clone the repository and open it in VS Code:

   ```sh
   git clone https://github.com/BlakeCampbells/Darkwind.git
   cd Darkwind
   code .
   ```

2. Press `F5` to launch an **Extension Development Host** window using the included launch configuration.
3. In that window, run **Preferences: Color Theme** from the Command Palette and select **Darkwind**.
4. Edit `themes/Darkwind-color-theme.json` in the original window. Changes appear automatically in the development window.

No dependency installation or build step is needed to preview the theme.

The main files are:

- [`themes/Darkwind-color-theme.json`](themes/Darkwind-color-theme.json): workbench colors, TextMate syntax rules, and semantic token colors.
- [`package.json`](package.json): extension metadata, VS Code compatibility, and theme registration.
- [`.vscode/launch.json`](.vscode/launch.json): configuration for previewing the theme locally.

### Validation and packaging

Release tooling requires Node.js 22 or later and npm. This is separate from the VS Code version required to use the theme.

Run the theme checks without installing dependencies:

```sh
npm test
```

The checks validate theme registration, color values, scope selectors, font styles, overlay transparency, and indentation guide compatibility.

Install the pinned packaging tool, inspect the files that will ship, and build a VSIX:

```sh
npm ci
npm run package:contents
npm run package
```

Packaging runs the checks first and creates a local VSIX using the version in `package.json`. Before publishing a new release, review the theme in the Extension Development Host, update the version in `package.json`, and record the release in `CHANGELOG.md`.

## Contributing

To report hard-to-read syntax or unexpected colors, [open an issue](https://github.com/BlakeCampbells/Darkwind/issues) with the language, a small code sample, and a screenshot.

Pull requests are welcome. Describe the colors or scopes you changed and include before-and-after screenshots so the changes are easy to review.

## License

Darkwind is available under the [MIT License](LICENSE).

## Resources

- [VS Code themes and customization](https://code.visualstudio.com/docs/configure/themes)
- [Creating and testing a color theme](https://code.visualstudio.com/api/extension-guides/color-theme)
- [Publishing a VS Code extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Changelog](CHANGELOG.md)
