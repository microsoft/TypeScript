/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSourceMap.baseline
// @sourceMap: true
// @Filename: inputFile.ts
//// var x = 109;
//// var foo = "hello world";
//// class M {
////   x: number;
////   y: string;
//// }

verify.baselineGetEmitOutput();