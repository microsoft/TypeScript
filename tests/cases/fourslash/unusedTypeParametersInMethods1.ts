/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class A {
////     [|public f1<X, Y, Z>(a: X)|] { a; var b: Z; b }
//// }

verify.rangeAfterCodeFix("public f1<X, Z>(a: X)");
