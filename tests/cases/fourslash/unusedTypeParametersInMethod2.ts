/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class C1 {
////    [|f1<T extends number, U>(a: U)|] {a;}
//// }

verify.codeFixAtPosition("f1<U>(a: U)");