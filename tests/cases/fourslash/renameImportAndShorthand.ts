/// <reference path='fourslash.ts' />

////import [|foo|] from 'bar';
////const bar = { [|foo|] };

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
