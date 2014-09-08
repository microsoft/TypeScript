/// <reference path="fourslash.ts" />

// @out: tests/cases/fourslash/singleFile.js
// @Filename: inputFile1.ts
//// var x: any;
//// class Bar {
////    x : string;
////    y : number
//// }

// @Filename: inputFile2.ts
//// var x: any;
//// class Foo{
////    x : string;
////    y : number
//// }

var outputFilename = "tests/cases/fourslash/singleFile.js";
verify.emitOutput(EmitReturnStatus.Succeeded, outputFilename);