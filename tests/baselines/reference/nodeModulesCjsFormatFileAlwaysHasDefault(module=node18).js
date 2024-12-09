//// [tests/cases/conformance/node/nodeModulesCjsFormatFileAlwaysHasDefault.ts] ////

//// [index.ts]
// cjs format file
export const a = 1;
//// [index.ts]
// esm format file
import mod from "./subfolder/index.js";
mod;
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

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
// cjs format file
exports.a = 1;
//// [index.js]
// esm format file
import mod from "./subfolder/index.js";
mod;


//// [index.d.ts]
export declare const a = 1;
//// [index.d.ts]
export {};
