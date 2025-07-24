// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: jsdocTypeofParameterConsistency.js
/**
 * @template T  
 * @param {T} a
 * @return {typeof a}
 */
function f(a) {
    return a;
}

/**
 * @template T
 * @param {T} b  
 * @return {typeof b}
 */
function g(b) {
    return b;
}