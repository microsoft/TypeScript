/// <reference path='fourslash.ts' />

////var x;
////var y = (p) => void /*1*/

verify.completions({ marker: "1", includes: ["p", "x"] });
