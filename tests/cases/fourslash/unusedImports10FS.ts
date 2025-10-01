/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// namespace A {
////    export class Calculator {
////         public handelChar() {
////         }
////     }
//// }

//// namespace B {
////     [|import a = A;|]
//// }

verify.rangeAfterCodeFix("");

