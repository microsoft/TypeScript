// @allowJs: true
// @checkJs: true
// @noEmit: true
/**
 * @param {T} a
 * @template T
 */
function f<T>(a: T) {
    return () => a
}
let n = f(1)()

/**
 * @param {T} a
 * @template T
 * @returns {function(): T}
 */
function g<T>(a: T) {
    return () => a
}
let s = g('hi')()
