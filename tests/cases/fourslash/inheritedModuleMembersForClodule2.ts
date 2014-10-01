/// <reference path="fourslash.ts" />

////module M {
////    export module A {
////        var o;
////    }
////}
////module M {
////    export class A { a = 1;}
////}
////module M {
////    export class A { /**/b }
////}

goTo.marker();
verify.quickInfoExists();
verify.numberOfErrorsInCurrentFile(4);