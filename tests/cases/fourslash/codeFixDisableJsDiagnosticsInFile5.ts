/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true
// @checkJs: true

// @Filename: a.js
////var x = "";
////
////[|/** comment */
////x = 1;|]

// Disable checking for next line
verify.rangeAfterCodeFix(`/** comment */
// @ts-suppress
x = 1;`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);

