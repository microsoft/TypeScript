/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////class C {
////    set [|x(v)|] {
////         v;
////    }
////}
////(new C).x = 1;

verify.rangeAfterCodeFix("x(v: number)", undefined, undefined, 1);