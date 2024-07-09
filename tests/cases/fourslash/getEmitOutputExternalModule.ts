/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputExternalModule.baseline
// @outFile: declSingleFile.js

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

verify.baselineGetEmitOutput();
