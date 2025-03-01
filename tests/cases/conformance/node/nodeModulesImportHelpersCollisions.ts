// @module: node16,node18,nodenext
// @declaration: true
// @importHelpers: true
// @filename: subfolder/index.ts
// cjs format file
import {default as _fs} from "fs";
_fs.readFile;
import * as fs from "fs";
fs.readFile;
// @filename: index.ts
// esm format file
import {default as _fs} from "fs";
_fs.readFile;
import * as fs from "fs";
fs.readFile;
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module"
}
// @filename: subfolder/package.json
{
    "type": "commonjs"
}
// @filename: types.d.ts
declare module "fs";
declare module "tslib" {
    export {};
    // intentionally missing all helpers
}