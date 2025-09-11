/// <reference path="fourslash.ts" />

////namespace M {
////    namespace A {
////        var o;
////    }
////    function A(/**/x: number): void { }
////}

goTo.marker();
verify.quickInfoExists();
verify.numberOfErrorsInCurrentFile(1);