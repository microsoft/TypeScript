/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// [|var x = function f1(m: number) {}|]
//// x;
//// export var y: string;

verify.rangeAfterCodeFix(`var x = function f1() {}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
