//// [tests/cases/compiler/commentOnBlock1.ts] ////

//// [commentOnBlock1.ts]
// asdf
function f() {
 /*asdf*/{}
}

//// [commentOnBlock1.js]
"use strict";
// asdf
function f() {
    /*asdf*/ { }
}
