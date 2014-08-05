/// <reference path="fourslash.ts" />

////module M {
////    module A {
////        var o;
////    }
////    function A(/**/x: number): void { }
////}

goTo.marker();
verify.quickInfoExists();
verify.numberOfErrorsInCurrentFile(1);