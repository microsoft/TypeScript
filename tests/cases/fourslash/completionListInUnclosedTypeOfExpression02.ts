/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => typeof /*1*/

goTo.marker("1");
verify.completionListContains("x");
verify.completionListContains("p");