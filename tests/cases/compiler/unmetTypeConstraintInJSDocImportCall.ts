// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: file1.js
/**
 * @template {string} T
 * @typedef {{ foo: T }} Foo
 */

export default {};

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: file2.js
/**
 * @template T
 * @typedef {import('./file1').Foo<T>} Bar
 */
