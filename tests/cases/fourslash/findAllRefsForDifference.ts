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
verify.referencesOf(ranges[0], ranges);
verify.referencesOf(ranges[1], ranges);
