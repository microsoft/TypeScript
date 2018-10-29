/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => x[/*1*/

verify.completions({ marker: "1", includes: ["p", "x"] });
