// A typed palette with a little room to grow.
type ColorRole = 'background' | 'keyword' | 'function' | 'string';

interface Swatch {
  readonly name: string;
  hex: `#${string}`;
  role: ColorRole;
}

const palette: readonly Swatch[] = [
  { name: 'Navy', hex: '#111827', role: 'background' },
  { name: 'Yellow', hex: '#ffeb82', role: 'keyword' },
  { name: 'Blue', hex: '#60a5fa', role: 'function' },
  { name: 'Violet', hex: '#a78bfa', role: 'string' },
];

function groupByRole<T extends Swatch>(colors: readonly T[]) {
  const groups = new Map<ColorRole, T[]>();
  for (const color of colors) {
    groups.set(color.role, [...(groups.get(color.role) ?? []), color]);
  }
  return groups;
}

const groups = groupByRole(palette);
const functions = groups.get('function') ?? [];
console.log(`${functions.length} function colors`, palette.length);
