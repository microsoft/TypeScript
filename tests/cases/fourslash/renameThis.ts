/// <reference path='fourslash.ts'/>

////function f([|this|]) {
////    return [|this|];
////}
////this/**/;
////const _ = { [|[|{| "contextRangeIndex": 2 |}this|]: 0|] }.[|this|];

const [r0, r1, r2Def, r2, r3] = test.ranges()

// Trying to rename a non-parameter 'this' should fail
goTo.marker();
verify.renameInfoFailed("You cannot rename this element.");

verify.baselineRename([r0, r1, r2, r3]);

