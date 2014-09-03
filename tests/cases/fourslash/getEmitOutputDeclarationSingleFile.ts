/// <reference path="fourslash.ts" />

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

var singleFilename = "tests/cases/fourslash/declSingleFile";
var jsFilename = singleFilename + ".js";
var declFilename = singleFilename + ".d.ts";
edit.enableSingleOutputFile(jsFilename);
edit.enableDeclaration();
var outputFilenames = jsFilename + " " + declFilename;
verify.emitOutput(EmitOutputResult.Succeeded, outputFilenames);