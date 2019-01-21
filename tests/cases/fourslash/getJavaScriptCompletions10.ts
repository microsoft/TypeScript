///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////**
//// * @type {function(this:number)}
//// */
////function f() { this./**/ }

verify.completions({ marker: "", includes: { name: "toExponential", kind: "method", kindModifiers: "declare" } });
