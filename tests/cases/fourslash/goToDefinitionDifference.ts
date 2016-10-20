
/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////}
////interface Gen2 {
////    /*1*/parent: Gen;
////    millenial: string;
////}
////function cloneAgain<T extends Gen & Gen2>(t: T): T - Gen {
////    var { x, ...rest } = t;
////    rest./*2*/parent;
////}
const ranges = test.ranges();
verify.goToDefinition('2', [ '1' ]);
