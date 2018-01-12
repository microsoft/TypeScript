/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////declare class C {
////    [|get x();|]
////}
////}
////(new C).x = 1;

verify.rangeAfterCodeFix("get x(): number;", undefined, undefined, 0);