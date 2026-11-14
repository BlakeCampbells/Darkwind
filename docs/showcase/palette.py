"""A few familiar colors for a focused workspace."""
from dataclasses import dataclass


@dataclass(frozen=True)
class Swatch:
    name: str
    hex_code: str

    def label(self) -> str:
        return f"{self.name}: {self.hex_code}"


palette = [
    Swatch("Cyan", "#a5f3fc"),
    Swatch("Blue", "#60a5fa"),
    Swatch("Violet", "#a78bfa"),
    Swatch("Coral", "#ff7878"),
]


def find_color(name: str, fallback: str = "#111827") -> str:
    for swatch in palette:
        if swatch.name.lower() == name.lower():
            return swatch.hex_code
    return fallback


print(find_color("Blue"), len(palette), 2026)
