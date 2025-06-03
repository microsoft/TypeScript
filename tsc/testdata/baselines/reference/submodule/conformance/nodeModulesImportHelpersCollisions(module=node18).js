//// [tests/cases/conformance/node/nodeModulesImportHelpersCollisions.ts] ////

//// [index.ts]
// cjs format file
import {default as _fs} from "fs";
_fs.readFile;
import * as fs from "fs";
fs.readFile;
//// [index.ts]
// esm format file
import {default as _fs} from "fs";
_fs.readFile;
import * as fs from "fs";
fs.readFile;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}
//// [types.d.ts]
declare module "fs";
declare module "tslib" {
    export {};
    // intentionally missing all helpers
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const fs_1 = require("fs");
fs_1.default.readFile;
const fs = require("fs");
fs.readFile;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// esm format file
const fs_1 = require("fs");
fs_1.default.readFile;
const fs = require("fs");
fs.readFile;


//// [index.d.ts]
export {};
//// [index.d.ts]
export {};
