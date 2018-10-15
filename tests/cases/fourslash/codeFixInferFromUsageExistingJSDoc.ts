/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: important.js

/////** @param x no types here! */
////function f(x) {
////    return x * 1
////}
////
////var o = {
////    /** @return Just one */
////    get m() { return 1 }
////}
/////** @type Vestigial or superfluous? You decide. */
////var x
////x = 1

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
     * @return {number} Just one
     */
    get m() { return 1 }
}
/**
 * @type {number} Vestigial or superfluous? You decide.
 */
var x
x = 1
`,
});

