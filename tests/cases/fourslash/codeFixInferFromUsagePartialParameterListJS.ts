/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: important.js
/////**
//// * @param {*} y
//// */
////function f(x, y, z) {
////    return x
////}
////f(1, 2, 3)

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 2,
    newFileContent:
`/**
 * @param {*} y
 * @param {number} x
 * @param {number} z
 */
function f(x, y, z) {
    return x
}
f(1, 2, 3)`,
});
