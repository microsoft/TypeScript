//// [tests/cases/compiler/requireOfJsonFileWithoutExtensionResolvesToTs.ts] ////

//// [file1.ts]
import c1 = require('./c'); // resolves to c.ts 
let x2 = c1.a;
import c2 = require('./c.json'); // resolves to c.json
if (x2) {
    let b = c2.b;
    let x = (c1.b === b);
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

//// [c.ts]
export = { a: true, b: "hello" };

//// [out/c.js]
"use strict";
module.exports = { a: true, b: "hello" };
//// [out/c.json]
{
    "a": true,
    "b": "hello"
}
//// [out/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var c1 = require("./c"); // resolves to c.ts 
var x2 = c1.a;
var c2 = require("./c.json"); // resolves to c.json
if (x2) {
    var b = c2.b;
    var x = (c1.b === b);
}
