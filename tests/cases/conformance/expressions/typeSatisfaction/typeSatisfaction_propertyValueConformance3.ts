export type Color = { r: number, g: number, b: number };

// All of these should be Colors, but I only use some of them here.
export const Palette = {
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, d: 0 }, // <- oops! 'd' in place of 'b'
    blue: { r: 0, g: 0, b: 255 },
} satisfies Record<string, Color>;
