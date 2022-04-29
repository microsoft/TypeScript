/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => typeof /*1*/

verify.completions({ marker: "1", includes: ["x", "p"] });
