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


//// [out/node_modules/f.js]
"use strict";
module.exports = 10;
//// [out/projects/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const f = require("f"); // should work to f.ts
let fnumber = f;
