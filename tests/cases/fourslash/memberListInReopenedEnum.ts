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
verify.memberListContains('A', '(enum member) E.A = 0');
verify.memberListContains('B', '(enum member) E.B = 1');
verify.memberListContains('C', '(enum member) E.C = 0');
verify.memberListContains('D', '(enum member) E.D = 1');