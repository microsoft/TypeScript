/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true
// @checkJs: true

// @Filename: a.js
////[|var x = "";
////x = 1;|]

// Disable checking for the whole file
verify.rangeAfterCodeFix(`// @ts-nocheck
var x = "";
x = 1;`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);

