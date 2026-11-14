/** Build a little collection of colors worth coming back to. */
const colors = [
  { name: 'Cyan', hex: '#a5f3fc', role: 'Variables and tags' },
  { name: 'Blue', hex: '#60a5fa', role: 'Functions and methods' },
  { name: 'Violet', hex: '#a78bfa', role: 'Strings' },
  { name: 'Coral', hex: '#ff7878', role: 'Numbers and constants' },
];

export class ThemePreview {
  constructor(name = 'Darkwind') {
    this.name = name;
    this.background = '#111827';
    this.palette = new Map(colors.map(color => [color.name, color]));
  }

  findColor(query) {
    const match = this.palette.get(query);
    return match?.hex ?? this.background;
  }

  describe() {
    return `${this.name}: ${this.palette.size} colors, one calm canvas.`;
  }
}

const preview = new ThemePreview();
const favorite = preview.findColor('Blue');
console.log(preview.describe(), favorite, 2026);
