/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f([|a |]) {
////    return a[0] + 1;
////}

verify.rangeAfterCodeFix("a: number[]",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
