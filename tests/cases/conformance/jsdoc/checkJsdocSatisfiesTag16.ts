// @strict: true
// @allowJS: true
// @checkJs: true
// @noEmit: true

// @filename: /a.js

/**
 * @satisfies {number}
 */
const t1 = /** @satisfies {number} */ (1);

/**
 * @satisfies {number}
 */
const t2 = /** @satisfies {string} */ (1);

/**
 * @satisfies {string}
 */
const t3 = /** @satisfies {number} */ (1);

/**
 * @satisfies {string}
 */
const t4 = /** @satisfies {string} */ (1);
