/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const { a, b: { c } } = [|require("a")|];

verify.not.codeFixAvailable();
