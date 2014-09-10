/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSingleFile2.baseline
// @declaration: true
// @Filename: inputFile1.ts
// @out: declSingleFile.js
// @outDir: tests/cases/fourslash/
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
////export var foo = 10;
////export var bar = "hello world"

var singleFilename = "declSingleFile";
var jsFilename = singleFilename + ".js";
var declFilename = singleFilename + ".d.ts";
var exportFilename = "tests/cases/fourslash/inputFile3"
var exportJSFilename = exportFilename + ".js";
var exportDeclFilename = exportFilename + ".d.ts";
var outputFilenames = jsFilename + " " + declFilename + " " + exportJSFilename + " " + exportDeclFilename;
verify.baselineGetEmitOutput();