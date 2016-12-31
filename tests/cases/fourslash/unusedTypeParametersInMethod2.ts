/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class C1 {
////    [|f1<T extends number, U>(a: U)|] {a;}
//// }

verify.rangeAfterCodeFix("f1<U>(a: U)");