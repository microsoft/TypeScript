/// <reference path='fourslash.ts' />
//// var x: [|function(new: number)|] = 12;

verify.rangeAfterCodeFix("new () => number");
