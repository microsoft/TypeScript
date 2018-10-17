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
////    /** 1
////     * @return First one
////     */
////    /** 2
////     * @see also
////     */
////    /** 3
////     * @return Second one
////     */
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
     * 1 2 3
     * @returns {number} First one
     * @see also
     */
    get m() { return undefined }
}
o.m = 1`,
});

