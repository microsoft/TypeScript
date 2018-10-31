/// <reference path='fourslash.ts' />

/////*1*/
////var x = 0, y = 1, z = 2;
////enum E {
////    A, B, C
////}

verify.completions({ marker: "1", includes: ["x", "y", "z", "E"] });
