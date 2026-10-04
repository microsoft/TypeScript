// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: bug.js
/**
 * @callback cb
 * @param x.y
 */

/**
 * @callback cb2
 * @param {object} x
 * @param {string} x.y
 */

/**
 * @overload
 * @param {object} x
 * @param {string} x.y
 * @returns {string}
 */
/**
 * @param {object} x
 * @returns {string}
 */
function foo(x) {
    return x.y;
}
