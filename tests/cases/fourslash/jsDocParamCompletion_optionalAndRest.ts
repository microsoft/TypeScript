/// <reference path="fourslash.ts" />

// Expectation: Declaration order is preserved: 'a' (optional) before 'z' (rest).
//// /**
////  * @param /*1*/
////  */
//// function foo(a?: number, ...z: number[]) {}

verify.completions({ marker: "1", exact: ["a", "z"] });


/**
 * Manual check:
 * Declaration order preserved: 'a' (optional) before 'z' (rest).
 * Place cursor after the space in '@param '.
 * @param 
 */
function foo(a?: number, ...z: number[]) {}


