/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////[|var x;|]
////function f() {
////    x++;
////}

verify.rangeAfterCodeFix("var x: number;", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);