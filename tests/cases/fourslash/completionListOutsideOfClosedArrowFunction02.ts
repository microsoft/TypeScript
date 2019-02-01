/// <reference path='fourslash.ts' />

////// no a or b
////(a, b) => { }/*1*/

verify.completions({ marker: "1", excludes: ["a", "b"] });
