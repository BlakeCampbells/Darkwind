import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const registration = manifest.contributes.themes[0];
const theme = JSON.parse(readFileSync(new URL(registration.path, root), 'utf8'));
const hexColor = /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;
const scopesOf = (rule) => Array.isArray(rule.scope) ? rule.scope : rule.scope.split(',');

test('the registered dark theme loads with syntax and workbench colors', () => {
  assert.equal(registration.uiTheme, 'vs-dark');
  assert.equal(theme.type, 'dark');
  assert.ok(theme.tokenColors.length > 0);
  assert.ok(Object.keys(theme.colors).length > 0);
  assert.ok(hexColor.test(theme.colors['editor.background']));
  assert.ok(hexColor.test(theme.colors['editor.foreground']));
});

test('workbench, TextMate, and semantic colors use supported hex notation', () => {
  const colors = Object.entries(theme.colors);
  for (const [index, rule] of theme.tokenColors.entries()) {
    for (const key of ['foreground', 'background']) {
      if (key in rule.settings) colors.push([`tokenColors[${index}].${key}`, rule.settings[key]]);
    }
  }
  for (const [selector, style] of Object.entries(theme.semanticTokenColors)) {
    const color = typeof style === 'string' ? style : style.foreground;
    if (color !== undefined) colors.push([`semanticTokenColors.${selector}`, color]);
  }
  for (const [name, color] of colors) {
    assert.equal(typeof color, 'string', `${name} must be a color string`);
    assert.ok(hexColor.test(color), `${name} has an invalid color: ${color}`);
  }
});

test('TextMate scopes are nonempty and have one unambiguous rule', () => {
  const seen = new Map();
  for (const [index, rule] of theme.tokenColors.entries()) {
    assert.ok(rule.settings && typeof rule.settings === 'object');
    for (const rawScope of scopesOf(rule)) {
      const scope = rawScope.trim();
      assert.ok(scope, `Rule ${index + 1} has an empty scope`);
      assert.ok(!seen.has(scope), `${scope} repeats in rules ${seen.get(scope)} and ${index + 1}`);
      seen.set(scope, index + 1);
    }
  }
});

test('scope selectors have no surrounding whitespace', () => {
  for (const rule of theme.tokenColors) {
    for (const scope of scopesOf(rule)) assert.equal(scope, scope.trim());
  }
});

test('C# labels are styled separately from Markdown headings', () => {
  for (const rule of theme.tokenColors) {
    const scopes = scopesOf(rule).map((scope) => scope.trim());
    if (scopes.includes('entity.name.label.cs')) {
      assert.ok(!scopes.some((scope) => scope.startsWith('markup.heading.')));
    }
  }
});

test('modern indentation colors preserve the legacy fallback colors', () => {
  for (const kind of ['background', 'activeBackground']) {
    const legacy = theme.colors[`editorIndentGuide.${kind}`];
    assert.ok(hexColor.test(legacy));
    assert.equal(theme.colors[`editorIndentGuide.${kind}1`], legacy);
  }
});

test('TextMate font styles use supported style tokens or an empty reset', () => {
  const supported = new Set(['italic', 'bold', 'underline', 'strikethrough']);
  for (const [index, rule] of theme.tokenColors.entries()) {
    if (!('fontStyle' in rule.settings)) continue;
    const style = rule.settings.fontStyle;
    assert.equal(typeof style, 'string', `Rule ${index + 1} fontStyle must be a string`);
    for (const token of style.split(/\s+/).filter(Boolean)) {
      assert.ok(supported.has(token), `Rule ${index + 1} has unsupported fontStyle: ${token}`);
    }
  }
});

test('selection, merge, and minimap overlays remain visible and translucent', () => {
  const overlays = [
    'editor.inactiveSelectionBackground',
    'merge.currentHeaderBackground',
    'merge.currentContentBackground',
    'merge.incomingHeaderBackground',
    'merge.incomingContentBackground',
    'merge.commonHeaderBackground',
    'merge.commonContentBackground',
    'minimap.findMatchHighlight',
    'minimap.selectionHighlight',
  ];
  for (const key of overlays) {
    const color = theme.colors[key];
    assert.match(color, /^#[\da-f]{8}$/i, `${key} needs an explicit alpha channel`);
    const alpha = Number.parseInt(color.slice(-2), 16);
    assert.ok(alpha > 0 && alpha < 255, `${key} must be visible without being opaque`);
  }
});
