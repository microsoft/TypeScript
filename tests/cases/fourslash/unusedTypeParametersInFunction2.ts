/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|function f1<X, Y>(a: X) {a}|]

verify.rangeAfterCodeFix("function f1<X>(a: X) {a}");
