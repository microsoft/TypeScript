/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|function f1<T>() {}|]

verify.codeFixAtPosition("function f1() {}");
