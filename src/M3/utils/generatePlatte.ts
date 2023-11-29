import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";

const LEVELS = [
  0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95,
  96, 98, 99, 100,
];

export const generatePalette = (hexColor: string) => {
  const intColor = argbFromHex(hexColor);
  const { palettes } = themeFromSourceColor(intColor);
  const tones: any = {};

  for (const [key, palette] of Object.entries(palettes)) {
    const tonelevel: any = {};
    for (const level of LEVELS) {
      tonelevel[level] = hexFromArgb(palette.tone(level));
    }
    tones[key] = tonelevel;
  }
  return tones;
};
