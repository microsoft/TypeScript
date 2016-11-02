/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    [|parent|]: Gen;
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest.[|parent|];
const ranges = test.ranges();
verify.assertHasRanges(ranges);
goTo.position(ranges[0].start);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, ranges);
goTo.position(ranges[1].start);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, ranges);
