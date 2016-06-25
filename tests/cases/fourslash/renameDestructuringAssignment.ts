/// <reference path='fourslash.ts' />

////interface I {
////    [|x|]: number;
////}
////var a: I;
////var x;
////({ [|x|]: x } = a);

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
