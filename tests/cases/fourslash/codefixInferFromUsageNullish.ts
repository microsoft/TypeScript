/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////declare const a: string
////function wat([|b |]) {
////    b(a ?? 1);
////}

verify.rangeAfterCodeFix("b: (arg0: string | number) => void");
