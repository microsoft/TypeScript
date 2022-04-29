//// [tests/cases/conformance/declarationEmit/typeReferenceRelatedFiles.ts] ////

//// [index.d.ts]
/// <reference path="fs.d.ts" />
//// [fs.d.ts]
declare module "fs" {
    interface FSWatcher {}
}
//// [package.json]
{
    "name": "@types/node",
    "version": "1.0.0"
}
//// [main.ts]
/// <reference types="node" />
import { FSWatcher } from "fs";
export function f() {
    return {} as FSWatcher;
}


//// [main.js]
"use strict";
exports.__esModule = true;
exports.f = void 0;
function f() {
    return {};
}
exports.f = f;


//// [main.d.ts]
/// <reference types="node" />
import { FSWatcher } from "fs";
export declare function f(): FSWatcher;
