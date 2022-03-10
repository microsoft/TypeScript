//// [tests/cases/compiler/requireOfJsonFileWithComputedPropertyName.ts] ////

//// [file1.ts]
import b1 = require('./b.json');
let x = b1;
import b2 = require('./b.json');
if (x) {
    x = b2;
}

//// [b.json]
{
    [a]: 10
}

//// [b.json]
var _a;
_a = {},
    _a[a] = 10,
    _a;
//// [file1.js]
"use strict";
exports.__esModule = true;
var b1 = require("./b.json");
var x = b1;
var b2 = require("./b.json");
if (x) {
    x = b2;
}
