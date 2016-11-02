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
verify.memberListContains('parent', '(property) Gen.parent: Gen');
verify.memberListContains('millenial', '(property) Gen.millenial: string');
verify.memberListCount(2);
