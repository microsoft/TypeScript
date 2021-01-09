/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function ...q) {}} f(10);

verify.codeFixAvailable([
    { description: "Add missing function declaration 'f'" }
]);
