//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsImportHelpersCollisions2.ts] ////

//// [index.ts]
// cjs format file
export * from "fs";
export * as fs from "fs";
//// [index.js]
// esm format file
export * from "fs";
export * as fs from "fs";
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
exports.fs = void 0;
var tslib_1 = require("tslib");
// cjs format file
tslib_1.__exportStar(require("fs"), exports);
exports.fs = tslib_1.__importStar(require("fs"));
//// [index.js]
// esm format file
export * from "fs";
export * as fs from "fs";


//// [index.d.ts]
/// <reference path="../../types.d.ts" />
export * from "fs";
export * as fs from "fs";
//// [index.d.ts]
/// <reference path="../types.d.ts" />
export * from "fs";
export * as fs from "fs";
