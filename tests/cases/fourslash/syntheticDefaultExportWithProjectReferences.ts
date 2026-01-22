/// <reference path='fourslash.ts'/>

// Test case for synthetic default imports from declaration files.
// Without project references, .d.ts files allow synthetic defaults due to ambiguity.
// With project references (tested manually), the referenced project's options determine 
// if synthetic defaults are allowed.

// @module: esnext
// @moduleResolution: bundler

// @Filename: /a/utils.d.ts
//// export declare const test: () => string;

// @Filename: /b/index.ts
//// import Test from '../a/utils';
////
//// console.log(Test.test());

// Without project references, this is allowed (no error) because we can't determine
// if the original JS was ESM or CJS
verify.getSemanticDiagnostics([]);
