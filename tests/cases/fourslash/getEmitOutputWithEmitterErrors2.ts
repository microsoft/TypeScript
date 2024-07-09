/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithEmitterErrors2.baseline
// @declaration: true
// @module: AMD

// @Filename: inputFile.ts
// @emitThisFile: true
////class C { }
////export module M {
////  export var foo = new C();
////}

verify.baselineGetEmitOutput();