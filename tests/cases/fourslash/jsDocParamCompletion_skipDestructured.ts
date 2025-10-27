/// <reference path="fourslash.ts" />

// Expectation: Destructured parameter is skipped; only identifier param 'z' is suggested.
//// /**
////  * @param /*1*/
////  */
//// function foo({ x }: any, z: number) {}

verify.completions({ marker: "1", exact: ["z"] });


/**
 * Manual check:
 * Destructured parameter is skipped; only 'z' is suggested.
 * Place cursor after the space in '@param '.
 * @param 
 */
function foo({ x }: any, z: number) {}


