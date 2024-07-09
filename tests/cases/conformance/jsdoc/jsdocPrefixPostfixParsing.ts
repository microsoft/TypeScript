// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: true
// @noImplicitAny: true

// @Filename: prefixPostfix.js

/**
 * @param {number![]} x - number[]
 * @param {!number[]} y - number[]
 * @param {(number[])!} z - number[]
 * @param {number?[]} a - parse error without parentheses
 * @param {?number[]} b - number[] | null
 * @param {(number[])?} c - number[] | null
 * @param {...?number} e - (number | null)[]
 * @param {...number?} f - number[] | null
 * @param {...number!?} g - number[] | null
 * @param {...number?!} h - parse error without parentheses (also nonsensical)
 * @param {...number[]} i - number[][]
 * @param {...number![]?} j - number[][] | null
 * @param {...number?[]!} k - parse error without parentheses
 * @param {number extends number ? true : false} l - conditional types work
 * @param {[number, number?]} m - [number, (number | undefined)?]
 */
function f(x, y, z, a, b, c, e, f, g, h, i, j, k, l, m) {
}
