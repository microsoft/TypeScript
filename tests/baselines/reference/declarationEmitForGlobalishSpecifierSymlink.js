//// [tests/cases/compiler/declarationEmitForGlobalishSpecifierSymlink.ts] ////

//// [impl.d.ts]
export function getA(): A;
export enum A {
    Val
}
//// [index.d.ts]
export * from "./src/impl";
//// [package.json]
{
    "name": "typescript-fsa",
    "version": "1.0.0"
}
//// [impl.d.ts]
export function getA(): A;
export enum A {
    Val
}
//// [index.d.ts]
export * from "./src/impl";
//// [package.json]
{
    "name": "typescript-fsa",
    "version": "1.0.0"
}
//// [index.ts]
import * as _whatever from "p2";
import { getA } from "typescript-fsa";

export const a = getA();
//// [index.d.ts]
export const a: import("typescript-fsa").A;



//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const typescript_fsa_1 = require("typescript-fsa");
exports.a = (0, typescript_fsa_1.getA)();


//// [index.d.ts]
export declare const a: import("typescript-fsa").A;
