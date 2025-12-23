/// <reference path="fourslash.ts" />

// Expectation: Only 'a' is suggested because 'z' is already documented.
//// /**
////  * @param z
////  * @param /*1*/
////  */
//// function foo(z: number, a: number) {}

verify.completions({ marker: "1", exact: ["a"] });


