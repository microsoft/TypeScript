/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////class C {
////    set [|x(v)|] {
////    }
////}
////(new C).x = 1;

verify.rangeAfterCodeFix("x(v: number)", undefined, undefined, 0);