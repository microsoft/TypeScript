/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// class A<Dummy> { public x: Dummy }
//// var x : {
////     [|new <T, U, K>(a: T): A<U>;|]
//// }

verify.rangeAfterCodeFix("new <T, U>(a: T): A<U>;");
