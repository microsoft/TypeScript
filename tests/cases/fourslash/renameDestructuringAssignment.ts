/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "contextRangeIndex": 0 |}x|]: number;|]
////}
////var a: I;
////var x;
////([|{ [|{| "contextRangeIndex": 2 |}x|]: x } = a|]);

verify.baselineRenameAtRangesWithText("x");
