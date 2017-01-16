/// <reference path='fourslash.ts' />

////var o = {
////    [|prop|]: 0
////};
////
////o = {
////    "[|prop|]": 1
////};
////
////o["[|prop|]"];
////o['[|prop|]'];
////o.[|prop|];


let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
