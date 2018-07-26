/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f(new C(100, 3, undefined)

verify.codeFixAvailable([]); // Parse error, so no unused diagnostics
