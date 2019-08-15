/// <reference path="fourslash.ts" />

//// class B {}
//// function foo() {
////     return {[|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}B|]: B|]};
//// }
//// class C extends (foo()).[|B|] {}
//// class C1 extends foo().[|B|] {}

verify.singleReferenceGroup("(property) B: typeof B", "B");
