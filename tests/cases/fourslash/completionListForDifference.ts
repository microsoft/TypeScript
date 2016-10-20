/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////}
////interface Gen2 {
////    parent: Gen;
////    millenial: string;
////}
////function cloneAgain<T extends Gen & Gen2>(t: T): T - Gen {
////    let rest: T - Gen;
////    let rest1: T - Gen - Gen2;
////    var { x, ...rest2 } = t;
////    t./*1*/x;
////    rest./*2*/x;
////    rest1./*3*/x;
////    rest2./*4*/x;
////}
goTo.marker('1');
verify.memberListContains('x', '(property) Gen.x: number');
verify.memberListContains('parent', '(property) Gen2.parent: Gen');
verify.memberListContains('millenial', '(property) Gen2.millenial: string');
verify.memberListCount(3);
goTo.marker('2');
verify.memberListContains('parent', '(property) Gen2.parent: Gen');
verify.memberListContains('millenial', '(property) Gen2.millenial: string');
verify.memberListCount(2);
goTo.marker('3');
verify.memberListCount(0);
goTo.marker('4');
verify.memberListContains('parent', '(property) Gen2.parent: Gen');
verify.memberListContains('millenial', '(property) Gen2.millenial: string');
verify.memberListCount(2);
