
/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    /*1*/parent: Gen;
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest.[|/*2*/parent|];

verify.baselineGoToDefinition('2');
