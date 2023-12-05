// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/**
 * @typedef {Object} Color
 * @property {number} r
 * @property {number} g
 * @property {number} b
 */

// All of these should be Colors, but I only use some of them here.
export const Palette = /** @satisfies {Record<string, Color>} */ ({
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, d: 0 }, // <- oops! 'd' in place of 'b'
    blue: { r: 0, g: 0, b: 255 },
});
