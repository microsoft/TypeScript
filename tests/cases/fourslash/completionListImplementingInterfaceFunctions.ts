/// <reference path="fourslash.ts" />

////interface I1 {
////    a(): void;
////    b(): void;
////}
////
////var imp1: I1 {
////    a() {},
////    /*0*/
////}
////
////var imp2: I1 {
////    a: () => {},
////    /*1*/
////}

goTo.marker("0");
verify.not.completionListContains("a");
goTo.marker("1");
verify.not.completionListContains("a");
