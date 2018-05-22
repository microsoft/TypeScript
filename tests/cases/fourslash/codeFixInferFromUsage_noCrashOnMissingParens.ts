/// <reference path='fourslash.ts' />

// @noImplicitAny: true
// @target: esnext

////class C {
////    m() { this.x * 2; }
////    get x { return null; }
////}

// Just testing that we don't crash in `insertTypeAnnotation` from inferFromUsage
verify.not.codeFixAvailable();
