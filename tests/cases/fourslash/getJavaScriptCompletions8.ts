///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////**
//// * @type {function(): number}
//// */
////var v;
////v()./**/

verify.completions({ marker: "", includes: { name: "toExponential", kind: "method", kindModifiers: "declare" } });
