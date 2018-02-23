//// [tests/cases/compiler/requireOfJsonFileNonRelativeWithoutExtensionResolvesToTs.ts] ////

//// [file1.ts]
import f = require("f"); // should work to f.ts
let fnumber: number = f;

//// [f.json]
{
    "a": true,
    "b": "hello"
}

//// [f.ts]
export = 10;

//// [f.js]
"use strict";
module.exports = 10;
//// [file1.js]
"use strict";
exports.__esModule = true;
var f = require("f"); // should work to f.ts
var fnumber = f;
