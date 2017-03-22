/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true
// @checkJs: true

// @Filename: a.js
////var x = 0;
////
////function f(_a) {
////    [|f(x());|]
////}

// Disable checking for next line
verify.rangeAfterCodeFix(`// @ts-ignore
    f(x());`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);

