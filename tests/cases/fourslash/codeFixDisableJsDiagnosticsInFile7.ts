/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true
// @checkJs: true

// @Filename: a.js
////var x = 0;
////
////function f(_a) {[|
////    x();
////|]}

// Disable checking for next line
verify.rangeAfterCodeFix(`//    @ts-expect-error
    x();`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);

