//// [tests/cases/compiler/requireOfJsonFileWithEmptyObject.ts] ////

//// [file1.ts]
import b1 = require('./b');
let x = b1;
import b2 = require('./b.json');
if (x) {
    x = b2;
}

//// [b.json]
{
}

//// [b.json]
{}
//// [file1.js]
"use strict";
exports.__esModule = true;
var b1 = require("./b");
var x = b1;
var b2 = require("./b.json");
if (x) {
    x = b2;
}
