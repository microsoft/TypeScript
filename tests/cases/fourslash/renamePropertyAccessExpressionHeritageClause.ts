/// <reference path="fourslash.ts" />

//// class B {}
//// function foo() {
////     return {[|[|{| "contextRangeIndex": 0 |}B|]: B|]};
//// }
//// class C extends (foo()).[|B|] {}
//// class C1 extends foo().[|B|] {}

verify.baselineRenameAtRangesWithText("B");