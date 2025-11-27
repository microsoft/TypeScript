// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

/**
 * @template const T
 * @typedef {[T]} X
 */

/**
 * @template const T
 */
class C { }

/**
 * @template private T
 * @param {T} x
 * @returns {T}
 */
function f(x) {
    return x;
}
