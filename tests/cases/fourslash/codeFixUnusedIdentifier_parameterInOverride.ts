/// <reference path='fourslash.ts' />

// @noUnusedParameters: true

////interface I {
////    m(x: number): void;
////}
////
////class C implements I {
////    m(x: number): void {}
////}

// No codefix to remove the parameter, it's inherited
verify.codeFixAvailable([{ description: "Prefix 'x' with an underscore" }]);
