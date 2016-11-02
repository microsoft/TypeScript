/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number
////    [|parent|]: Gen;
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest.[|parent|];
const ranges = test.ranges();
verify.referencesOf(ranges[0], ranges);
verify.referencesOf(ranges[1], ranges);
