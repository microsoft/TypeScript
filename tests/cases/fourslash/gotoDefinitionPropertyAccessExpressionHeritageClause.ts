/// <reference path='fourslash.ts' />

//// class B {}
//// function foo() {
////     return {/*refB*/B: B};
//// }
//// class C extends (foo()).[|/*B*/B|] {}
//// class C1 extends foo().[|/*B1*/B|] {}

verify.baselineGoToDefinition("B", "B1");