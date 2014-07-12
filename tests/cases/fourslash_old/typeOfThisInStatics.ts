/// <reference path='fourslash.ts'/>

////class C {
////    static foo() {
////        var r/*1*/ = this;
////    }
////    static get x() {
////        var r/*2*/ = this;
////        return 1;
////    }
////}

goTo.marker('1');
verify.quickInfoIs('typeof C');

goTo.marker('2');
verify.quickInfoIs('typeof C');