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
import { default as _fs } from "fs";
_fs.readFile;
import * as fs from "fs";
fs.readFile;
//// [index.js]
import { default as _fs } from "fs";
_fs.readFile;
import * as fs from "fs";
fs.readFile;
