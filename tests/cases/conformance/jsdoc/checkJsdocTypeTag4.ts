// @checkJs: true
// @allowJs: true
// @noEmit: true

// @Filename: t.d.ts
type A<T extends string> = { a: T }

// @Filename: test.js
/** Also should error for jsdoc typedefs
 * @template {string} U
 * @typedef {{ b: U }} B
 */
/** @type {A<number>} */
var a;
/** @type {B<number>} */
var b;
