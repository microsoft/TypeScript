/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// function f() {
////     // helloWorld leaks from here into the global space?
////     if (helloWorld) {
////         return 3;
////     }
////     return 5;
//// }
////
//// hello/**/

verify.completions({ includes: "helloWorld" });
