/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSourceRootMultiFiles.baseline
// @Filename: inputFile1.ts
// @sourceMap: true
// @sourceRoot: sourceRootDir/
//// var x = 109;
//// var foo = "hello world";
//// class M {
////   x: number;
////   y: string;
//// }

// @Filename: inputFile2.ts
//// var bar = "hello world Typescript";
//// class C {
////   x: number;
////   y: string[];
//// }

verify.baselineGetEmitOutput();