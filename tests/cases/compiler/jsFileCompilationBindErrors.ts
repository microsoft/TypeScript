// @allowJs: true
// @checkJs: true
// @noEmit: true
// @allowUnreachableCode: false

// @filename: a.js
let C = "sss";
let C = 0;  // Error: Cannot redeclare block-scoped variable 'C'.

function f() {
    return;
    return;  // Error: Unreachable code detected.
}

function b() {
    "use strict";
    var arguments = 0;  // Error: Invalid use of 'arguments' in strict mode.
}