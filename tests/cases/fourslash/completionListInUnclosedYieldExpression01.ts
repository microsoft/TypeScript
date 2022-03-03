/// <reference path='fourslash.ts' />

////var x;
////var y = function* gen(p) { yield /*1*/

verify.completions({ marker: "1", includes: ["x", "y", "gen", "p", ...completion.globalsVars] });
