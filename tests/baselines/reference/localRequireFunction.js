//// [tests/cases/compiler/localRequireFunction.ts] ////

//// [app.js]
function require(a) {
    return a;
}

const fs = require("fs");
const text = fs.readFileSync("/a/b/c");

//// [app.js]
"use strict";
function require(a) {
    return a;
}
const fs = require("fs");
const text = fs.readFileSync("/a/b/c");
