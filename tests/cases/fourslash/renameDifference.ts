/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////}
////interface Gen2 {
////    [|parent|]: Gen;
////    millenial: string;
////}
////function cloneAgain<T extends Gen & Gen2>(t: T): T - Gen {
////    var { x, ...rest } = t;
////    rest.[|parent|];
////}
const ranges = test.ranges();
verify.assertHasRanges(ranges);
goTo.position(ranges[0].start);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, ranges);
goTo.position(ranges[1].start);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, ranges);
