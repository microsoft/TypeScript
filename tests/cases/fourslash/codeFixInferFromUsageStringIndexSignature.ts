/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f([|a |]) {
////    return a['hi'];
////}

verify.rangeAfterCodeFix("a: { [x: string]: any; }",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
