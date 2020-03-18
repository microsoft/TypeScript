/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true
// @checkJs: true

// @Filename: a.js
////var x = 0;
////
////function f(_a) {[|
////    /** comment for f */
////    f(x());
////|]}

// Disable checking for next line
verify.rangeAfterCodeFix(`    /** comment for f */
    // @ts-expect-error
    f(x());`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);

