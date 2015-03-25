/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => `abc ${ 123 } ${ /*1*/

goTo.marker("1");
verify.completionListContains("p");
verify.completionListContains("x");