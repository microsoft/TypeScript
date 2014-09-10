/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithEmitterErrors2.baseline
// @declaration: true
// @module: AMD
// @Filename: inputFile.ts
////class C { }
////export module M {
////  export var foo = new C();
////}

verify.baselineGetEmitOutput();