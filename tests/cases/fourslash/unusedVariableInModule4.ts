/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// var x = function f1(m: number) {}
//// x;
//// export var y: string;

verify.codeFixAtPosition(`
export {}
var x = function f1() {}
x;
export var y: string;
`);
