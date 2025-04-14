//// [tests/cases/compiler/requireOfJsonFileWithEmptyObject.ts] ////

//// [file1.ts]
import b1 = require('./b.json');
let x = b1;
import b2 = require('./b.json');
if (x) {
    x = b2;
}

//// [b.json]
{
}

//// [out/b.json]
{}
//// [out/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b1 = require("./b.json");
var x = b1;
var b2 = require("./b.json");
if (x) {
    x = b2;
}
