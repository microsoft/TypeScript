/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function ...q) {}} f(10);

verify.not.codeFixAvailable([
    { "description": "Infer parameter types from usage" }
]);
