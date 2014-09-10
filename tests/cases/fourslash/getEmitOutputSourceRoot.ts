/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSourceRoot.baseline
// @sourceMap: true
// @Filename: inputFile.ts
// @sourceRoot: sourceRootDir/
//// var x = 109;
//// var foo = "hello world";
//// class M {
////   x: number;
////   y: string;
//// }

verify.baselineGetEmitOutput();