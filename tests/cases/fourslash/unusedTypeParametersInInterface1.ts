/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// [|interface I<T> {}|]

verify.codeFixAtPosition("interface I {}");