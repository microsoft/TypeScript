/// <reference path='fourslash.ts'/>

////interface One {
////    common: { /*one*/a: number; };
////}
////
////interface Base {
////    /*base*/a: string;
////    b: string;
////}
////
////interface HasAOrB extends Base {
////    a: string;
////    b: string;
////}
////
////interface Two {
////    common: HasAOrB;
////}
////
////var x : One | Two;
////
////x.common./*x*/a;

verify.baselineFindAllReferences('one', 'base', 'x')
