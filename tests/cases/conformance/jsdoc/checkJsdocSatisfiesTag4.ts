// @noEmit: true
// @module: esnext
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/**
 * @typedef {Object} Foo
 * @property {number} a
 */
export default /** @satisfies {Foo} */ ({});

// @filename: /b.js
/**
 * @typedef {Object} Foo
 * @property {number} a
 */

export default /** @satisfies {Foo} */ ({ a: 1 });