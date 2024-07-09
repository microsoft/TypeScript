///<reference path="fourslash.ts" />

// @allowJs: true

// With 'ts-check' on, we return the same completions we do for TypeScript code.

// @Filename: /a.js
////// @ts-check
////interface I { a: number; b: number; }
////interface J { b: number; c: number; }
////declare const ij: I | J;
////ij./**/

verify.completions({
    marker: "",
    exact: ["b"],
});
