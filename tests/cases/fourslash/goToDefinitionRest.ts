
/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    /*1*/parent: Gen;
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest./*2*/parent;
const ranges = test.ranges();
verify.goToDefinition('2', [ '1' ]);
