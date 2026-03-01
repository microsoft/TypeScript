//// [tests/cases/compiler/dynamicRequire.ts] ////

//// [a.js]
function foo(name) {
    var s = require("t/" + name)
}


//// [a_out.js]
"use strict";
function foo(name) {
    var s = require("t/" + name);
}
