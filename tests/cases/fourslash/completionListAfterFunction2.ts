/// <reference path='fourslash.ts' />

////// Outside the function expression
////declare var f1: (a: number) => void; /*1*/
////
////declare var f1: (b: number, b2: /*2*/) => void;

goTo.marker("1");
verify.not.completionListContains("a");

goTo.marker("2");
verify.completionListContains("b");

