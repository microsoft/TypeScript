/// <reference path="fourslash.ts" />

//// class B {}
//// function foo() {
////     return {[|{| "isWriteAccess": true, "isDefinition": true |}B|]: B};
//// }
//// class C extends (foo()).[|B|] {}
//// class C1 extends foo().[|B|] {}

verify.singleReferenceGroup("(property) B: typeof B");
