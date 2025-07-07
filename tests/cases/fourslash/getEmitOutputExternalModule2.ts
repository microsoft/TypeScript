/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputExternalModule2.baseline
// @outFile: declSingleFile.js

// @Filename: inputFile1.ts
//// var x: number = 5;
//// class Bar {
////    x : string;
////    y : number
//// }

// @Filename: inputFile2.ts
// @emitThisFile: true
//// var x: string = "world";
//// class Bar2 {
////    x : string;
////    y : number
//// }

// @Filename: inputFile3.ts
//// export module M {
//// 	class C {c}
//// }

verify.baselineGetEmitOutput();
