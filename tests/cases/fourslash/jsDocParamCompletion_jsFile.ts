/// <reference path="fourslash.ts" />
// @allowJs: true
// @Filename: a.js

// Expectation (JS): Declaration order is preserved: 'z' before 'a'.
//// /**
////  * @param /*1*/
////  */
//// function foo(z, a) {}

goTo.file("a.js");
verify.completions({ marker: "1", exact: ["z", "a"] });


/**
 * Manual check (TS file view):
 * Order preserved: 'z' before 'a'.
 * Place cursor after the space in '@param '.
 * @param 
 */
function foo(z, a) {}


