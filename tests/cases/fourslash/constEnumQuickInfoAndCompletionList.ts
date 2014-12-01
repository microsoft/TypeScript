/// <reference path='fourslash.ts' />

////const enum /*1*/e {
////    a,
////    b,
////    c
////}
/////*2*/e.a;

goTo.marker('1');
verify.quickInfoIs("const enum e");

goTo.marker('2');
verify.completionListContains("e", "const enum e");
verify.quickInfoIs("const enum e");