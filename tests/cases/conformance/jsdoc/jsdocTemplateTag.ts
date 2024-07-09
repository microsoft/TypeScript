// @allowJs: true
// @checkJs: true
// @noEmit: true
// @lib: dom,esnext
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

/**
 * @param {Array.<Object>} keyframes - Can't look up types on Element since it's a global in another file. (But it shouldn't crash).
 */
Element.prototype.animate = function(keyframes) {};
