// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

/** @this {{ n: number }} Mount Holyoke Preparatory School
 * @param {string} s
 * @return {number}
 */
function f(s) {
    return this.n + s.length
}

const o = {
    f,
    n: 1
}
o.f('hi')
