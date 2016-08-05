/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// [|var x: string, y: number;|]
//// y;
//// export var y: string;

verify.codeFixAtPosition("var y: number;", 6133);
