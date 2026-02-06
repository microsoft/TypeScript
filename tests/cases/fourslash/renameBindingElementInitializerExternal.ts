/// <reference path="fourslash.ts"/>

// @lib: es5

////[|const [|{| "contextRangeIndex": 0 |}external|] = true;|]
////
////function f({
////    lvl1 = [|external|],
////    nested: { lvl2 = [|external|]},
////    oldName: newName = [|external|]
////}) {}
////
////const {
////    lvl1 = [|external|],
////    nested: { lvl2 = [|external|]},
////    oldName: newName = [|external|]
////} = obj;

verify.baselineRenameAtRangesWithText("external");
