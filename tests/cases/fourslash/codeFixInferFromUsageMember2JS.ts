/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js

/////** @typedef {{ [|p |]}} I */
/////** @type {I} */
////var i;
////i.p = 0;


verify.rangeAfterCodeFix("p: number", undefined, undefined, 1);
