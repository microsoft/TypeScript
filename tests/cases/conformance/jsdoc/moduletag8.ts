// @allowJs: true
// @filename: moduletag8.js
// @out: dummy124.js
/** @module color/mixer */

/** The name of the module. */
export const name = 'mixer';

/** The most recent blended color. */
export var lastColor = null;

/** Blend two colors together. */
export function blend(color1, color2) {}

// convert color to array of RGB values (0-255)
function rgbify(color) {}

export {
    /**
     * Get the red, green, and blue values of a color.
     * @function
     */
    rgbify as toRgb
}
