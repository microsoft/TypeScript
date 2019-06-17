///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {Array.<number>} */
////var v;
////v./**/

verify.completions({ marker: "", includes: { name: "concat", kind: "method", kindModifiers: "declare" } });
