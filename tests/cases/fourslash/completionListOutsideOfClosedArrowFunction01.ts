/// <reference path='fourslash.ts' />

////// no a or b
/////*1*/(a, b) => { }

verify.completions({ marker: "1", excludes: ["a", "b"] });
