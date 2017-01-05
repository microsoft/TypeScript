/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|function f1<X, Y, Z>(a: X) {a;var b:Z;b}|]

verify.rangeAfterCodeFix("function f1<X, Z>(a: X) {a;var b:Z;b}");
