// @declaration: true
// @emitDeclarationOnly: true
// @allowJs: true
// @filename: /a.js
export function Foo() { }

/**
 * @overload
 * @param {string} a
 * @return {void}
 */

/**
 * @overload
 * @param {number} a
 * @param {string} b
 * @return {void}
 */

/**
 * @param {string | number} a
 * @param {string} [b]
 * @return {void}
 */
Foo.prototype.bar = function (a, b) { }
