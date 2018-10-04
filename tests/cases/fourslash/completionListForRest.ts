/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    parent: Gen;
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest./*1*/x;
goTo.marker('1');
verify.completionListContains('parent', '(property) Gen.parent: Gen');
verify.completionListContains('millenial', '(property) Gen.millenial: string');
verify.completionListCount(2);
