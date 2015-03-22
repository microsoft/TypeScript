/// <reference path='fourslash.ts' />

////var x;
////var y = function* gen(p) { yield /*1*/

goTo.marker("1");
// These tentatively don't work.
verify.not.completionListContains("p");
verify.not.completionListContains("gen");
verify.not.completionListContains("x");