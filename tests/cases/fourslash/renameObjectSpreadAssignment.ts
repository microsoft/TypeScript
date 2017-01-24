/// <reference path='fourslash.ts'/>

////interface A1 { a: number };
////interface A2 { a?: number };
////let [|a1|]: A1;
////let [|a2|]: A2;
////let a12 = { ...[|a1|], ...[|a2|] };

const ranges = test.ranges();
verify.assertHasRanges(ranges);


// rename a1
goTo.rangeStart(ranges[0]);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[0], ranges[2]]);
goTo.rangeStart(ranges[2]);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[0], ranges[2]]);
// rename a2
goTo.rangeStart(ranges[1]);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[1], ranges[3]]);
goTo.rangeStart(ranges[3]);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[1], ranges[3]]);
