/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js

////function f([|a|]) {
////    return a[0] + 1;
////}

verify.fileAfterCodeFix(
`/** @param {number[]} a */
function f(a) {
    return a[0] + 1;
}`, undefined, 2);
