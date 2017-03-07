/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true
// @checkJs: true

// @Filename: a.js
////[|var x = "";
////x = 1;|]

// Disable checking for next line
verify.rangeAfterCodeFix(`var x = "";
// @ts-suppress
x = 1;`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
