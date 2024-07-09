/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithEmitterErrors.baseline
// @declaration: true

// @Filename: inputFile.ts
// @emitThisFile: true
////module M {
////  class C { }
////  export var foo = new C();
////}


// Only generate javscript file. The semantic error should not affect it
verify.baselineGetEmitOutput();