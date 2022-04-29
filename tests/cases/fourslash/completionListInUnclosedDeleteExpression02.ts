/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => delete /*1*/

verify.completions({ marker: "1", includes: ["x", "p"] });
