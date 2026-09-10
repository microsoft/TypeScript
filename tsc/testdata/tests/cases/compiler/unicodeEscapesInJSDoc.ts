// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @target: es2018
// @filename: file.js
/**
 * @param {number} \u0061
 * @param {number} a\u0061
 * @param {number} a\u0062c\u0064e
 */
function foo(a, aa, abcde) {
    console.log(a + aa + abcde);
}

/**
 * @param {number} \u{0061}
 * @param {number} a\u{0061}
 * @param {number} a\u{62}c\u{64}e
 */
function bar(a, aa, abcde) {
    console.log(a + aa + abcde);
}
