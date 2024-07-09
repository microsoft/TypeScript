//// [tests/cases/compiler/alwaysStrictES6.ts] ////

//// [alwaysStrictES6.ts]
function f() {
    var arguments = [];
}

//// [alwaysStrictES6.js]
"use strict";
function f() {
    var arguments = [];
}
