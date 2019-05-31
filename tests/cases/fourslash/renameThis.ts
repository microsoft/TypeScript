/// <reference path='fourslash.ts'/>

////function f([|{| "declarationRangeIndex": 0 |}this|]) {
////    return [|this|];
////}
////this/**/;
////const _ = { [|[|{| "declarationRangeIndex": 2 |}this|]: 0|] }.[|this|];

const [r0, r1, r2Def, r2, r3] = test.ranges()
verify.rangesAreRenameLocations([r0, r1]);

// Trying to rename a non-parameter 'this' should fail
goTo.marker();
verify.renameInfoFailed("You cannot rename this element.");

verify.rangesAreRenameLocations([r2, r3]);

