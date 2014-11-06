/// <reference path='fourslash.ts' />

////// Outside the function expression
////var x1 = (a: number) => { }/*1*/;
////
////var x2 = (b: number) => {/*2*/ };

goTo.marker("1");
verify.not.completionListContains("a");

goTo.marker("2");
verify.completionListContains("b");
