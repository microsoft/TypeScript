/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @Filename: a.js
////[|// @ts-check
////var x = "";
////x = 1;|]

verify.rangeAfterCodeFix(`// @ts-nocheck
var x = "";
x = 1;`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);