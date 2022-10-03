/// <reference path='fourslash.ts' />

////var v1 = ((1, 2, 3), 4, 5, (6, 7));/*1*/
////function f1() {
////    var a = 1;
////    return a, v1, a;/*2*/
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("var v1 = ((1, 2, 3), 4, 5, (6, 7));");
goTo.marker("2");
verify.currentLineContentIs("    return a, v1, a;");