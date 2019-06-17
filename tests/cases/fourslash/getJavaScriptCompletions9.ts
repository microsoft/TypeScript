///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////**
//// * @type {function(new:number)}
//// */
////var v;
////new v()./**/

verify.completions({ marker: "", includes: { name: "toExponential", kind: "method", kindModifiers: "declare" } });
