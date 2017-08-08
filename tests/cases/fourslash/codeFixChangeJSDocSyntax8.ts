/// <reference path='fourslash.ts' />
//// var x: [|function(this: number, number): string|] = 12;

verify.rangeAfterCodeFix("(this: number, arg1: number) => string");
