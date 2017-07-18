/// <reference path='fourslash.ts' />
//// var x: [|Array.<number>|] = 12;

verify.rangeAfterCodeFix("number[]");
