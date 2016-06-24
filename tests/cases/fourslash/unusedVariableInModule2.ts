/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// var x: string, y: number;
//// y;
//// export var y: string;

verify.codeFixAtPosition(`
export {}
var y: number;
y;
export var y: string;
`);
