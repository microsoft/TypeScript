/// <reference path='fourslash.ts' />

////var o = {
////    [|[|{| "declarationRangeIndex": 0 |}prop|]: 0|]
////};
////
////o = {
////    [|"[|{| "declarationRangeIndex": 2 |}prop|]": 1|]
////};
////
////o["[|prop|]"];
////o['[|prop|]'];
////o.[|prop|];

const rangesByText = test.rangesByText();
verify.rangesAreRenameLocations(rangesByText.get("prop"));
