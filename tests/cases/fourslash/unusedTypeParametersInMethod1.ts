/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class C1 {
////    [|f1<T extends number>()|] {}
//// }

verify.rangeAfterCodeFix("f1()");