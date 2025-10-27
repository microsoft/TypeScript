//// [tests/cases/compiler/requireOfJsonFileNonRelative.ts] ////

//// [file1.ts]
import b1 = require('b.json');
let x = b1.a;
import b2 = require('c.json');
if (x) {
    let b = b2.b;
    x = (b1.b === b);
}

//// [b.json]
{
    "a": true,
    "b": "hello"
}

//// [c.json]
{
    "a": true,
    "b": "hello"
}


//// [out/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b1 = require("b.json");
let x = b1.a;
const b2 = require("c.json");
if (x) {
    let b = b2.b;
    x = (b1.b === b);
}
