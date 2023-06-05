/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function g(a, b) { b; }
////g(1, 2);

verify.not.codeFixAvailable("Remove unused declaration for: 'a'");
