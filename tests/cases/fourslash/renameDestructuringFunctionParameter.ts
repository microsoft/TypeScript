/// <reference path='fourslash.ts' />

////function f({[|a|]}: {[|a|]}) {
////    f({[|a|]});
////}
let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
