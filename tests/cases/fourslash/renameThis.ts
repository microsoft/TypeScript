/// <reference path='fourslash.ts'/>

////function f([|this|]) {
////    return [|this|];
////}
////this/**/;
////const _ = { [|this|]: 0 }.[|this|];

const [r0, r1, r2, r3] = test.ranges()
verify.rangesAreRenameLocations([r0, r1]);

// Trying to rename a non-parameter 'this' should fail
goTo.marker();
verify.renameInfoFailed("You cannot rename this element.");

verify.rangesAreRenameLocations([r2, r3]);

