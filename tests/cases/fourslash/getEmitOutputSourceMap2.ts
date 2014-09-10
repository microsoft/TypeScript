/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSourceMap2.baseline
// @sourceMap: true
// @Filename: inputFile1.ts
// @outDir: sample/outDir
//// var x = 109;
//// var foo = "hello world";
//// class M {
////   x: number;
////   y: string;
//// }

// @Filename: inputFile2.ts
//// var intro = "hello world";
//// if (intro !== undefined) {
////    var k = 10;
//// }

var filename = "sample/outDir/sourceMapResult";
var jsFilename = filename + ".js"; 
var sourceMapFilename = filename + ".js.map"; 
var outputFilenames = jsFilename + " " + sourceMapFilename;
verify.baselineGetEmitOutput();
//verify.emitOutput(EmitReturnStatus.Succeeded, outputFilenames);