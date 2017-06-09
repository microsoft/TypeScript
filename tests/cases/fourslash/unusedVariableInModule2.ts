/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// [|var x: string, z: number;|]
//// z;
//// export var y: string;

verify.rangeAfterCodeFix("var z: number;");
