// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: forgot.js
/**
 * @param {T} a
 * @template T
 */
function f(a) {
    return () => a
}
let n = f(1)()

/**
 * @param {T} a
 * @template T
 * @returns {function(): T}
 */
function g(a) {
    return () => a
}
let s = g('hi')()
