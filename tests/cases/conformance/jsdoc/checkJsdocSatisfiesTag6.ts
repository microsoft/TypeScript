// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/**
 * @typedef {Object} Point2d
 * @property {number} x
 * @property {number} y
 */

// Undesirable behavior today with type annotation
const a = /** @satisfies {Partial<Point2d>} */ ({ x: 10 });

// Should OK
console.log(a.x.toFixed());

// Should error
let p = a.y;
