/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutput-pp.baseline
// @declaration: true

// @Filename: inputFile1.ts
// @emitThisFile: true
//// var x: number = 5;
//// class Bar {
////    x : string;
////    y : number
//// }

// @Filename: inputFile2.ts
// @emitThisFile: true
//// var x1: string = "hello world";
//// class Foo{
////    x : string;
////    y : number;
//// }

verify.baselineGetEmitOutput();