/// <reference path="fourslash.ts" />

//// interface I {}
//// interface CTor {
////     new (hour: number, minute: number): I
//// }
//// var x: {
////     B : CTor
//// };
//// class B {}
//// function foo() {
////     return {[|B|]: B};
//// }
//// class C extends (foo()).[|B|] {}
//// class C1 extends foo().[|B|] {}

const [def, ref1, ref2] = test.ranges();
verify.referencesOf(ref1, [def, ref1, ref2]);
verify.referencesOf(ref2, [def, ref1, ref2]);
verify.referencesOf(def, [def, ref1, ref2]);