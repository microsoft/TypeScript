/// <reference path='fourslash.ts'/>

////module M {
////    enum E {
////        A, B
////    }
////    enum E {
////        C = 0, D
////    }
////    var x = E./*1*/
////}


goTo.marker('1');
verify.completionListContains('A', '(enum member) E.A = 0');
verify.completionListContains('B', '(enum member) E.B = 1');
verify.completionListContains('C', '(enum member) E.C = 0');
verify.completionListContains('D', '(enum member) E.D = 1');