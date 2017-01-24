/// <reference path='fourslash.ts'/>

////function f([|this|]) {
////    return [|this|];
////}
////this/**/;
////const _ = { [|this|]: 0 }.[|this|];

let [r0, r1, r2, r3] = test.ranges()
for (let range of [r0, r1]) {
    goTo.rangeStart(range);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [r0, r1]);
}

// Trying to rename a non-parameter 'this' should fail
goTo.marker();
verify.renameInfoFailed("You cannot rename this element.");

for (let range of [r2, r3]) {
    goTo.rangeStart(range);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [r2, r3]);
}
