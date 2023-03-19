// @noImplicitAny: true
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: /a.js

/**
 * @overload
 * @param {number} x
 */

/**
 * @overload
 * @param {string} x
 */

/**
 * @param {string | number} x
 * @returns {string | number}
 */
function id(x) {
    return x;
}

export let a = id(123);
export let b = id("hello");
