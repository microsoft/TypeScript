/// <reference path="fourslash.ts" />

// @declaration: true
// @Filename: inputFile1.ts
// @out: declSingleFile.js
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

var singleFilename = "declSingleFile";
var jsFilename = singleFilename + ".js";
var declFilename = singleFilename + ".d.ts";
var outputFilenames = jsFilename + " " + declFilename;
verify.emitOutput(EmitReturnStatus.Succeeded, outputFilenames);