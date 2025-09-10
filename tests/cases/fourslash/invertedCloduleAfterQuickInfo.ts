/// <reference path="fourslash.ts" />

////namespace M {
////    namespace A {
////        var o;
////    }
////    class A {
////        /**/c
////    }
////}

goTo.marker();
verify.quickInfoExists();
verify.numberOfErrorsInCurrentFile(1);