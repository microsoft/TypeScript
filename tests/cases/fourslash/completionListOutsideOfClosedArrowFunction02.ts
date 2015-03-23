/// <reference path='fourslash.ts' />

////// no a or b
////(a, b) => { }/*1*/

goTo.marker("1");
verify.not.completionListContains("a");
verify.not.completionListContains("b");