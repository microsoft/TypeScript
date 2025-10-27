/// <reference path="fourslash.ts" />

// Expectation: Suggestions are based on the implementation signature: 'a', then 'z'.
//// /**
////  * @param /*1*/
////  */
//// function foo(a: number, z: number): void;
//// function foo(a: number, z: number): void {}

verify.completions({ marker: "1", exact: ["a", "z"] });


/**
 * Manual check:
 * Suggestions based on implementation signature: 'a' then 'z'.
 * Place cursor after the space in '@param '.
 * @param 
 */
function foo(a: number, z: number): void;
function foo(a: number, z: number): void {}


