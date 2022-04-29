/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////interface I {
////    [|p;|]
////}
////var i: I;
////i.p = 0;

verify.rangeAfterCodeFix("p: number;");