/// <reference path='fourslash.ts' />
// @noLib: true

/////*1*/this;
////function f(/*2*/this) {
////    return /*3*/this;
////    function g(/*4*/this) { return /*5*/this; }
////}
////class C {
////    static x() {
////        /*6*/this;
////    }
////    static y() {
////        () => /*7*/this;
////    }
////    constructor() {
////        /*8*/this;
////    }
////    method() {
////        () => /*9*/this;
////    }
////}
////// These are *not* real uses of the 'this' keyword, they are identifiers.
////const x = { /*10*/this: 0 }
////x./*11*/this;

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11');
