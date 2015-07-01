/// <reference path='fourslash.ts' />

////var x;
////var y = x[/*1*/

goTo.marker("1");
verify.completionListContains("x");