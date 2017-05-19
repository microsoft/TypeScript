/// <reference path='fourslash.ts' />

////const enum /*1*/e {
////    a,
////    b,
////    c
////}
/////*2*/e.a;

verify.quickInfoAt("1", "const enum e");

goTo.marker('2');
verify.completionListContains("e", "const enum e");
verify.quickInfoIs("const enum e");