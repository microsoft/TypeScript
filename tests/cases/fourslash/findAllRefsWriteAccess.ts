/// <reference path='fourslash.ts' />

////interface Obj {
////    [|[`[|{| "isDefinition": true, "contextRangeIndex": 0 |}num|]`]: number;|]
////}
////
////let o: Obj = {
////    [|[`[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}num|]`]: 0|]
////};
////
////o = {
////    [|['[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}num|]']: 1|]
////};
////
////o['[|num|]'] = 2;
////o[`[|num|]`] = 3;
////
////o['[|num|]'];
////o[`[|num|]`];

verify.singleReferenceGroup("(property) Obj[`num`]: number", "num");
