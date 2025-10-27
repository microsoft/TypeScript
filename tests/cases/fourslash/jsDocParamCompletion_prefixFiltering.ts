/// <reference path="fourslash.ts" />

// Expectation: Only 'a' is suggested due to prefix filtering after '@param a'.
//// /**
////  * @param a/*1*/
////  */
//// function foo(z: number, a: number) {}

verify.completions({ marker: "1", exact: ["a"] });


/**
 * Manual check:
 * Only 'a' should be suggested due to prefix filtering after '@param a'.
 * Place cursor right after the 'a'.
 * @param a
 */
function foo(z: number, a: number) {}


