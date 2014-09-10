/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputMapRoots.baseline
// @Filename: inputFile.ts
// @sourceMap: true
// @mapRoot: mapRootDir/
//// var x = 109;
//// var foo = "hello world";
//// class M {
////   x: number;
////   y: string;
//// }

verify.baselineGetEmitOutput();