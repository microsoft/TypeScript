//// [tests/cases/conformance/declarationEmit/typesVersionsDeclarationEmit.ambient.ts] ////

//// [package.json]
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        ">=3.1.0-0": { "*" : ["ts3.1/*"] }
    }
}

//// [index.d.ts]
declare module "ext" {
    export interface A {}
    export function fa(): A;
}
declare module "ext/other" {
    export interface B {}
    export function fb(): B;
}
//// [index.d.ts]
declare module "ext" {
    export interface A {}
    export function fa(): A;
}
declare module "ext/other" {
    export interface B {}
    export function fb(): B;
}

//// [main.ts]
import { fa } from "ext";
import { fb } from "ext/other";

export const va = fa();
export const vb = fb();


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vb = exports.va = void 0;
const ext_1 = require("ext");
const other_1 = require("ext/other");
exports.va = (0, ext_1.fa)();
exports.vb = (0, other_1.fb)();


//// [main.d.ts]
export declare const va: import("ext").A;
export declare const vb: import("ext/other").B;
