/// <reference path='fourslash.ts' />

////var o = {
////    [|[|{| "contextRangeIndex": 0 |}prop|]: 0|]
////};
////
////o = {
////    [|"[|{| "contextRangeIndex": 2 |}prop|]": 1|]
////};
////
////o["[|prop|]"];
////o['[|prop|]'];
////o.[|prop|];

verify.baselineRenameAtRangesWithText("prop");
