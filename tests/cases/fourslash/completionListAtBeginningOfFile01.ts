/// <reference path='fourslash.ts' />

/////*1*/
////var x = 0, y = 1, z = 2;
////enum E {
////    A, B, C
////}

goTo.marker("1");
verify.completionListContains("x");
verify.completionListContains("y");
verify.completionListContains("z");
verify.completionListContains("E");