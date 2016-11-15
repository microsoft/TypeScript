/// <reference path='fourslash.ts'/>

////interface A1 { a: number };
////interface A2 { a?: number };
////let [|a1|]: A1;
////let [|a2|]: A2;
////let a12 = { ...[|a1|], ...[|a2|] };
const ranges = test.ranges();
verify.assertHasRanges(ranges);

// rename a1
goTo.position(ranges[0].start);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[0], ranges[2]]);
goTo.position(ranges[2].start);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[0], ranges[2]]);
// rename a2
goTo.position(ranges[1].start);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[1], ranges[3]]);
goTo.position(ranges[3].start);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[1], ranges[3]]);
