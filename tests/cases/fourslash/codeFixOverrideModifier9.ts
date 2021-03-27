/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

//// class B {
////     a: string
//// }
//// class D extends B {
////     constructor(public a: string, public b: string) {
////         super();
////     }
//// }

verify.not.codeFixAvailable();

