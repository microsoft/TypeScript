//// [tests/cases/conformance/declarationEmit/typesVersionsDeclarationEmit.multiFileBackReferenceToSelf.ts] ////

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
export interface A {}
export function fa(): A;

//// [other.d.ts]
export interface B {}
export function fb(): B;

//// [index.d.ts]
export * from "../";

//// [other.d.ts]
export * from "../other";

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
export declare const va: any;
export declare const vb: import("ext/other").B;
