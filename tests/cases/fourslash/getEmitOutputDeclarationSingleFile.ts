/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputDeclarationSingleFile.baseline
// @declaration: true
// @outFile: declSingleFile.js

// @Filename: inputFile1.ts
// @emitThisFile: true
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

verify.baselineGetEmitOutput();
