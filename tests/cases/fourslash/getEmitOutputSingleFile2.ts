/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSingleFile2.baseline
// @module: CommonJS
// @declaration: true
// @outFile: declSingleFile.js
// @outDir: /tests/cases/fourslash/

// @Filename: inputFile1.ts
//// var x: number = 5;
//// class Bar {
////    x : string;
////    y : number
//// }

// @Filename: inputFile2.ts
//// var x1: string = "hello world";
//// class Foo{
////    x : string;
////    y : number;
//// }

// @Filename: inputFile3.ts
// @emitThisFile: true
////export var foo = 10;
////export var bar = "hello world"

verify.baselineGetEmitOutput();
