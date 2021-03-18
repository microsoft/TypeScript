/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: important.js

////function f(x, y) {
////    x += 0;
////    y += "";
////}
////
////function g(z) {
////    return z * 2;
////}
////
////let x = null;
////function h() {
////    if (!x) x = 2;
////}

verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent:
`/**
 * @param {number} x
 * @param {string} y
 */
function f(x, y) {
    x += 0;
    y += "";
}

/**
 * @param {number} z
 */
function g(z) {
    return z * 2;
}

/** @type {number | null} */
let x = null;
function h() {
    if (!x) x = 2;
}`,
});
