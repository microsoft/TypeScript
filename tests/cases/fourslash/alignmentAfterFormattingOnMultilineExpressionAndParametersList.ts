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
verify.indentationIs(8);
goTo.marker("2");
verify.indentationIs(12);
goTo.marker("3");
verify.indentationIs(12);
