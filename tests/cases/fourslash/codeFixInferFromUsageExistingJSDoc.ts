/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: false
// @Filename: important.js

/////** @param x no types here! */
////function f(x) {
////    return x * 1
////}
////
////var o = {
////    /** @return Just one */
////    get m() { return undefined }
////}
////o.m = 1

verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent:
`/**
 * @param {number} x no types here!
 */
function f(x) {
    return x * 1
}

var o = {
    /**
     * @returns {number} Just one
     */
    get m() { return undefined }
}
o.m = 1`,
});

