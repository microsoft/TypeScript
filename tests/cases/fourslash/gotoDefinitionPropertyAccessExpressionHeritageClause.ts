/// <reference path='fourslash.ts' />

//// interface I {}
//// interface CTor {
////     new (hour: number, minute: number): I
//// }
//// var x: {
////     B : CTor
//// };
//// class B {}
//// function foo() {
////     return {/*refB*/B: B};
//// }
//// class C extends (foo())./*B*/B {}
//// class C1 extends foo()./*B1*/B {}

verify.goToDefinition([["B", "refB"], ["B1", "refB"]]);