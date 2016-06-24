/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// var x: string;
//// export var y: string;

verify.codeFixAtPosition(`
export {}
export var y: string;
`);
