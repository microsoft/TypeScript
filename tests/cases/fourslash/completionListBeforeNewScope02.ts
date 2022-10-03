/// <reference path='fourslash.ts' />

////a/*1*/
////
////{
////    let aaaaaa = 10;
////}

verify.completions({ marker: "1", excludes: "aaaaaa" });
