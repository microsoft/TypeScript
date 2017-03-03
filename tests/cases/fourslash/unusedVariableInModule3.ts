/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// [|var x = function f1() {}
//// export var y: string;|]

verify.rangeAfterCodeFix("export var y: string;");
