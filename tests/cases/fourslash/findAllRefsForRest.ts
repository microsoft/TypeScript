/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number
////    /*1*/parent: Gen;
////    millennial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest./*2*/parent;

verify.baselineFindAllReferences('1', '2');
