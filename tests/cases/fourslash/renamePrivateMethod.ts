/// <reference path='fourslash.ts' />

////class Foo {
////   [|[|{| "contextRangeIndex": 0 |}#foo|]() { }|]
////   callFoo() {
////       return this.[|#foo|]();
////   }
////}

const ranges = test.rangesByText().get("#foo");
verify.baselineRename(ranges);
