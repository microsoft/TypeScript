/// <reference path='fourslash.ts' />

////var f = function ([|x |]) {
////    return x
////}
////f(1)

verify.rangeAfterCodeFix("x: number",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);

