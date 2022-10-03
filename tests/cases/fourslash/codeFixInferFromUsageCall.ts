/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function wat([|b |]) {
////    b();
////}

verify.rangeAfterCodeFix("b: () => void");