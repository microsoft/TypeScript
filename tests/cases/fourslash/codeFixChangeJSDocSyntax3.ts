/// <reference path='fourslash.ts' />
//// var x: [|......number[][]|] = 12;

verify.rangeAfterCodeFix("number[][][][]");
