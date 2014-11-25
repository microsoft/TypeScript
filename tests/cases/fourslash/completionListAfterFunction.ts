/// <reference path='fourslash.ts' />

////// Outside the function
////declare function f1(a: number);/*1*/
////
////// inside the function
////declare function f2(b: number, b2 = /*2*/
////
////// Outside the function
////function f3(c: number) { }/*3*/
////
////// inside the function
////function f4(d: number) { /*4*/}

goTo.marker("1");
verify.not.completionListContains("a");

goTo.marker("2");
verify.completionListContains("b");

goTo.marker("3");
verify.not.completionListContains("c");

goTo.marker("4");
verify.completionListContains("d");
