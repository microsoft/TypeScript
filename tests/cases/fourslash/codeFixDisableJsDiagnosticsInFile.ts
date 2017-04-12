/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @Filename: a.js
////[|// @ts-check|]
////var x = "";
////x = 1;

verify.rangeAfterCodeFix("// @ts-nocheck", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);