//// [tests/cases/compiler/dynamicRequire.ts] ////

//// [a.js]
function foo(name) {
    var s = require("t/" + name)
}


//// [a.js]
"use strict";
function foo(name) {
    var s = require("t/" + name);
}
