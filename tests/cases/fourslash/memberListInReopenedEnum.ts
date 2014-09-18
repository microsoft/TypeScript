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
verify.memberListContains('A', 'E', undefined, "E.A");
verify.memberListContains('B', 'E', undefined, "E.B");
verify.memberListContains('C', 'E', undefined, "E.C");
verify.memberListContains('D', 'E', undefined, "E.D");