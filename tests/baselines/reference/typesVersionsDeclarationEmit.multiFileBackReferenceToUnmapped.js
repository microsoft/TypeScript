//// [tests/cases/conformance/declarationEmit/typesVersionsDeclarationEmit.multiFileBackReferenceToUnmapped.ts] ////

//// [package.json]
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        ">=3.1.0-0": {
            "index" : ["ts3.1/index"]
        }
    }
}

//// [index.d.ts]
export interface A {}
export function fa(): A;

//// [other.d.ts]
export interface A2 {}
export function fa(): A2;

//// [index.d.ts]
export * from "../other";

//// [main.ts]
import { fa } from "ext";
import { fa as fa2 } from "ext/other";

export const va = fa();
export const va2 = fa2();


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.va2 = exports.va = void 0;
const ext_1 = require("ext");
const other_1 = require("ext/other");
exports.va = (0, ext_1.fa)();
exports.va2 = (0, other_1.fa)();


//// [main.d.ts]
export declare const va: import("ext").A2;
export declare const va2: import("ext").A2;
