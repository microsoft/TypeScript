/// <reference path='fourslash.ts' />

////class Foo {
////   [|[|{| "contextRangeIndex": 0 |}#foo|] = 1;|]
////
////   getFoo() {
////       return this.[|#foo|];
////   }
////}

verify.baselineRenameAtRangesWithText("#foo");
