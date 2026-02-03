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
{
    [a]: 10
}
//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b1 = require("./b.json");
let x = b1;
var b2 = require("./b.json");
if (x) {
    x = b2;
}
