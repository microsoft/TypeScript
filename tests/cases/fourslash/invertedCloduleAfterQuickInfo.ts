/// <reference path="fourslash.ts" />

////module M {
////    module A {
////        var o;
////    }
////    class A {
////        /**/c
////    }
////}

goTo.marker();
verify.quickInfoExists();
verify.numberOfErrorsInCurrentFile(1);