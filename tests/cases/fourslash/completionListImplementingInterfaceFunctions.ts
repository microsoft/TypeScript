/// <reference path="fourslash.ts" />

////interface I1 {
////    a(): void;
////    b(): void;
////}
////
////var imp1: I1 = {
////    a() {},
////    /*0*/
////}
////
////var imp2: I1 = {
////    a: () => {},
////    /*1*/
////}

verify.completions({ marker: ["0", "1"], exact: "b" });
