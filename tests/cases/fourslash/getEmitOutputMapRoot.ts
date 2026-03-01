/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputMapRoots.baseline
// @outFile: declSingleFile.js
// @sourceMap: true
// @mapRoot: mapRootDir/

// @Filename: inputFile.ts
// @emitThisFile: true
//// var x = 109;
//// var foo = "hello world";
//// class M {
////   x: number;
////   y: string;
//// }

verify.baselineGetEmitOutput();
