///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @return {number} */
////function foo(a,b) { }
////foo(1,2)./**/

verify.completions({ marker: "", includes: { name: "toExponential", kind: "method", kindModifiers: "declare" } });
