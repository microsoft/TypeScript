/// <reference path='fourslash.ts' />

////class TestClass {
////    private testMethod1(param1: boolean,
////                        param2/*1*/: boolean) {
////    }
////
////    public testMethod2(a: number, b: number, c: number) {
////        if (a === b) {
////        }
////        else if (a != c &&
////                 a/*2*/ > b &&
////                 b/*3*/ < c) {
////        }
////
////    }
////}

format.document();
goTo.marker("1");
// The expected scenario is failing due to bug 674623 - 'If' expression formatting is very broken.
//verify.indentationIs(24);
verify.indentationIs(8);
goTo.marker("2");
// The expected scenario is failing due to bug 674623 - 'If' expression formatting is very broken.
//verify.indentationIs(17);
verify.indentationIs(12);
goTo.marker("3");
// The expected scenario is failing due to bug 674623 - 'If' expression formatting is very broken.
//verify.indentationIs(17);
verify.indentationIs(12);