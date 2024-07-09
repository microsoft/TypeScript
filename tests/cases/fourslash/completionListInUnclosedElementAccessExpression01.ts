/// <reference path='fourslash.ts' />

////var x;
////var y = x[/*1*/

verify.completions({ marker: "1", includes: "x" });
