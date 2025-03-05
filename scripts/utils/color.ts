interface HSL {
  h: number;
  s: number;
  l: number;
}

export function convertHexToHsl(hex: string): string {
  // Remove the hash (#) if present
  hex = hex.replace('#', '');

  // Handle alpha channel if present
  let alpha = '';
  if (hex.length === 8) {
    alpha = Math.round((parseInt(hex.slice(6, 8), 16) / 255) * 100) + '%';
    hex = hex.slice(0, 6);
  }

  // Convert hex to RGB
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Convert to percentages
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return alpha ? `${h} ${s}% ${l}% / ${alpha}` : `${h} ${s}% ${l}%`;
} 