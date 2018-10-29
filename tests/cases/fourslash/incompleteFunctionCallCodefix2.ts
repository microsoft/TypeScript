/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f(new C(100, 3, undefined)

verify.codeFixAvailable([
    { "description": "Infer parameter types from usage" }
]); // Parse error, so no unused diagnostics
