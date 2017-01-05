/// <reference path='fourslash.ts' />

//// interface I { x: number; }
////
//// export default class implements I {[| |]}

verify.rangeAfterCodeFix(`
x: number;
`);