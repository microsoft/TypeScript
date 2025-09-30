//// [tests/cases/conformance/node/nodeModulesImportHelpersCollisions3.ts] ////

//// [index.ts]
// cjs format file
export {default} from "fs";
//// [index.ts]
// esm format file
export {default} from "fs";
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
exports.default = void 0;
var tslib_1 = require("tslib");
// cjs format file
var fs_1 = require("fs");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return tslib_1.__importDefault(fs_1).default; } });
//// [index.js]
// esm format file
export { default } from "fs";


//// [index.d.ts]
export { default } from "fs";
//// [index.d.ts]
export { default } from "fs";
