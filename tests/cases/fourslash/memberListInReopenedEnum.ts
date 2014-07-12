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
verify.memberListContains('A', 'E', undefined, "M.E.A");
verify.memberListContains('B', 'E', undefined, "M.E.B");
verify.memberListContains('C', 'E', undefined, "M.E.C");
verify.memberListContains('D', 'E', undefined, "M.E.D");