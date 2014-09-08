/// <reference path="fourslash.ts" />

// @declaration: true
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

var inputFile1 = "tests/cases/fourslash/inputFile1";
var inputFile2 = "tests/cases/fourslash/inputFile2";
var outputFilenames = inputFile1 + ".js" + " " + inputFile2 + ".js" + " " + inputFile1 + ".d.ts" + " " + inputFile2 + ".d.ts";
verify.emitOutput(EmitReturnStatus.Succeeded);