// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: jsdocParseMatchingBackticks.js

/**
 * `@param` initial at-param is OK in title comment
 * @param {string} x hi there `@param`
 * @param {string} y hi there `@ * param
 *                   this is the margin
 *                   so we'll drop everything before it
 `@param` @param {string} z hello???
 * `@param` @param {string} alpha hello???
 * `@ * param` @param {string} beta hello???
 * @param {string} gamma
 */
export function f(x, y, z, alpha, beta, gamma) {
    return x + y + z + alpha + beta + gamma
}
