/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => [1,2,.../*1*/

goTo.marker("1");
verify.completionListContains("p");
verify.completionListContains("x");