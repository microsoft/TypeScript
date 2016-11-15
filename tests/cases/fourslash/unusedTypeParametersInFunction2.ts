/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|function f1<X, Y>(a: X) {a}|]

verify.codeFixAtPosition("function f1<X>(a: X) {a}");
