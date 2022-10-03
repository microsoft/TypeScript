/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////class C {
////    [|get x() |]{
////       return undefined;
////    }
////}
////(new C).x = 1;

verify.rangeAfterCodeFix("get x(): number", undefined, undefined, 0);