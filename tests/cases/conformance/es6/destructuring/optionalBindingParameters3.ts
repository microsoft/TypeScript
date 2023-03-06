// @checkJs: true
// @allowJs: true
// @noEmit: true
// @filename: /a.js

/**
 * @typedef Foo
 * @property {string} a
 */

/**
 * @param {Foo} [options]
 */
function f({ a = "a" }) {}
