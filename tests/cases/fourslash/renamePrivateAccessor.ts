/// <reference path='fourslash.ts' />

////class Foo {
////   [|get [|{| "contextRangeIndex": 0 |}#foo|]() { return 1 }|]
////   [|set [|{| "contextRangeIndex": 2 |}#foo|](value: number) { }|]
////   retFoo() {
////       return this.[|#foo|];
////   }
////}

const ranges = test.rangesByText().get("#foo");
verify.baselineRename(ranges);
