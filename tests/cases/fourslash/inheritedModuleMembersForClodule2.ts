/// <reference path="fourslash.ts" />

////namespace M {
////    export namespace A {
////        var o;
////    }
////}
////namespace M {
////    export class A { a = 1;}
////}
////namespace M {
////    export class A { /**/b }
////}

goTo.marker();
verify.quickInfoExists();
verify.numberOfErrorsInCurrentFile(4);