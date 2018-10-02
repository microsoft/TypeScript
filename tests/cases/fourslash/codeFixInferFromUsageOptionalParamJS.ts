/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js
////function f([|a|]){
////    a;
////}
////f();
////f(1);

verify.fileAfterCodeFix(
`/** @param {number} [a] */
function f(a) {
    a;
}
f();
f(1);`, undefined, 2);
