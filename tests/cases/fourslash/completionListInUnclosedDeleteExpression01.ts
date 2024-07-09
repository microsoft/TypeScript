/// <reference path='fourslash.ts' />

////var x;
////var y = delete /*1*/

verify.completions({marker: "1", includes: "x" });
