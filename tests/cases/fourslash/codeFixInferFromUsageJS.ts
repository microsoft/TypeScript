/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: test.js
////[|var foo;|]
////function f() {
////    foo += 2;
////}

verify.rangeAfterCodeFix("/** @type {number} */\nvar foo;",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 2);
