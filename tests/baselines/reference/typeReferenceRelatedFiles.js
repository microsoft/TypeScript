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
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() {
    return {};
}


//// [main.d.ts]
import { FSWatcher } from "fs";
export declare function f(): FSWatcher;
