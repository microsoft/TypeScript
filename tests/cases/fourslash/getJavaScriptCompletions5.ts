///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// /**
////  * @template T
////  * @param {T} a
////  * @return {T} */
//// function foo(a) { }
//// let x = foo;
//// foo(1)./**/

verify.completions({ marker: "", includes: { name: "toExponential", kind: "method", kindModifiers: "declare" } });
