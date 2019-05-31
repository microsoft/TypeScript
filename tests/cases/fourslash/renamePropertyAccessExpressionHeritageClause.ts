/// <reference path="fourslash.ts" />

//// class B {}
//// function foo() {
////     return {[|[|{| "declarationRangeIndex": 0 |}B|]: B|]};
//// }
//// class C extends (foo()).[|B|] {}
//// class C1 extends foo().[|B|] {}

const ranges = test.rangesByText();
verify.rangesAreRenameLocations(ranges.get("B"));