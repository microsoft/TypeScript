// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: source.js

/**
 * @param {number} x
 * @param {number} y
 */
export function Point(x, y) {
    if (!(this instanceof Point)) {
        return new Point(x, y);
    }
    this.x = x;
    this.y = y;
}

// @filename: referencer.js

import {Point} from "./source";

/**
 * @param {Point} p
 */
export function magnitude(p) {
    return Math.sqrt(p.x ** 2 + p.y ** 2);
}
