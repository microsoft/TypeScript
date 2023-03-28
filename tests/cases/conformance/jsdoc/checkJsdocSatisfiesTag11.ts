// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/**
 * @typedef {Object} T1
 * @property {number} a
 */

/**
 * @typedef {Object} T2
 * @property {number} a
 */

/**
 * @satisfies {T1}
 * @satisfies {T2}
 */
const t1 = { a: 1 };

/**
 * @satisfies {number}
 */
const t2 = /** @satisfies {number} */ (1);
