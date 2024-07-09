/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSourceMap2.baseline
// @sourceMap: true
// @outDir: sample/outDir

// @Filename: inputFile1.ts
// @emitThisFile: true
//// var x = 109;
//// var foo = "hello world";
//// class M {
////   x: number;
////   y: string;
//// }

// @Filename: inputFile2.ts
// @emitThisFile: true
//// var intro = "hello world";
//// if (intro !== undefined) {
////    var k = 10;
//// }

verify.baselineGetEmitOutput();