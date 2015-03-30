/// <reference path='fourslash.ts' />

////// no a or b
/////*1*/(a, b) => { }

goTo.marker("1");
verify.not.completionListContains("a");
verify.not.completionListContains("b");