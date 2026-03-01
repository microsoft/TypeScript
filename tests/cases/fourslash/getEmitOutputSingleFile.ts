/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputSingleFile.baseline
// @outFile: outputDir/singleFile.js

// @Filename: inputFile1.ts
//// var x: any;
//// class Bar {
////    x : string;
////    y : number
//// }

// @Filename: inputFile2.ts
// @emitThisFile: true
//// var x: any;
//// class Foo{
////    x : string;
////    y : number
//// }

verify.baselineGetEmitOutput();
