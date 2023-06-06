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


//// [tests/cases/compiler/out/node_modules/f.js]
"use strict";
module.exports = 10;
//// [tests/cases/compiler/out/projects/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var f = require("f"); // should work to f.ts
var fnumber = f;
