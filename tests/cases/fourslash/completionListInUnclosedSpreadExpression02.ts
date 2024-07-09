/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => [1,2,.../*1*/

verify.completions({ marker: "1", includes: ["p", "x"] });
