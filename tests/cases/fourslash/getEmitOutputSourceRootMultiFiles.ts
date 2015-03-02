/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSourceRootMultiFiles.baseline
// @sourceMap: true
// @sourceRoot: sourceRootDir/

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
//// var bar = "hello world Typescript";
//// class C {
////   x: number;
////   y: string[];
//// }

verify.baselineGetEmitOutput();