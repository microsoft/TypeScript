//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsImportHelpersCollisions1.ts] ////

//// [index.js]
// cjs format file
import {default as _fs} from "fs";
_fs.readFile;
import * as fs from "fs";
fs.readFile;
//// [index.js]
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
const tslib_1 = require("tslib");
// cjs format file
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
fs_1.default.readFile;
const fs = (0, tslib_1.__importStar)(require("fs"));
fs.readFile;
//// [index.js]
// esm format file
import { default as _fs } from "fs";
_fs.readFile;
import * as fs from "fs";
fs.readFile;


//// [index.d.ts]
export {};
//// [index.d.ts]
export {};
