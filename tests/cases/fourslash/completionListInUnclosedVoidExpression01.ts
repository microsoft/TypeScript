/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => void /*1*/

goTo.marker("1");
verify.completionListContains("p");
verify.completionListContains("x");