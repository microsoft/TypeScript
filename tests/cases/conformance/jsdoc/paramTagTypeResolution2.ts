// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: 38572.js

/**
 * @template T
 * @param {T} a
 * @param {{[K in keyof T]: (value: T[K]) => void }} b
 */
function f(a, b) {
}

f({ x: 42 }, { x(param) { param.toFixed() } });
