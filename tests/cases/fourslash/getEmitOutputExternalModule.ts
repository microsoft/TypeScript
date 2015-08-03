/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputExternalModule.baseline
// @out: declSingleFile.js
// @module: amd

// @Filename: inputFile1.ts
// @emitThisFile: true
//// var x: number = 5;
//// class Bar {
////    x : string;
////    y : number
//// }

// @Filename: inputFile2.ts
//// export module M {
//// 	class C {c}
//// }

debugger;

verify.baselineGetEmitOutput();