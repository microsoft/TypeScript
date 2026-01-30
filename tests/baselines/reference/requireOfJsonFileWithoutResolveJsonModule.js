//// [tests/cases/compiler/requireOfJsonFileWithoutResolveJsonModule.ts] ////

//// [file1.ts]
import b1 = require('./b.json'); // error
let x = b1.a;
import b2 = require('./b.json'); // error
if (x) {
    let b = b2.b;
    x = (b1.b === b);
}

//// [b.json]
contents Not read

//// [out/b.json]
{ contents, Not, read }
//// [out/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b1 = require("./b.json"); // error
let x = b1.a;
const b2 = require("./b.json"); // error
if (x) {
    let b = b2.b;
    x = (b1.b === b);
}
