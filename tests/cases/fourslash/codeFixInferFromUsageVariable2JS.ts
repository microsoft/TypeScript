/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true
// @Filename: important.js
////[|var x;
////function f() {
////    x++;
////}|]

verify.rangeAfterCodeFix(`/** @type {number} */
var x;
function f() {
    x++;
}
`, /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 2);
