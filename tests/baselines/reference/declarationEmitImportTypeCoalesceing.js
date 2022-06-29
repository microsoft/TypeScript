//// [tests/cases/compiler/declarationEmitImportTypeCoalesceing.ts] ////

//// [whole.d.ts]
declare namespace thing {
    export const a = 1;
    export interface A {}
    export function getNs(): typeof thing;
}
export = thing;
//// [types.d.ts]
export interface A {}
export interface B {}
export interface C {}

export declare function getA(): A;
export declare function getB(): B;
export declare function getC(): C;
//// [index.ts]
import { getA } from "./types";
import { getNs } from "./whole";

export const a1 = getA();
export const a2 = [getA()];
export const a3 = { a: getA() };

export const ns1 = getNs();
export const ns2 = [getNs()];
export const ns3 = { a: getNs() };


//// [index.js]
"use strict";
exports.__esModule = true;
exports.ns3 = exports.ns2 = exports.ns1 = exports.a3 = exports.a2 = exports.a1 = void 0;
var types_1 = require("./types");
var whole_1 = require("./whole");
exports.a1 = (0, types_1.getA)();
exports.a2 = [(0, types_1.getA)()];
exports.a3 = { a: (0, types_1.getA)() };
exports.ns1 = (0, whole_1.getNs)();
exports.ns2 = [(0, whole_1.getNs)()];
exports.ns3 = { a: (0, whole_1.getNs)() };


//// [index.d.ts]
import type * as _ns_1 from "./whole";
import { type A } from "./types";
export declare const a1: A;
export declare const a2: A[];
export declare const a3: {
    a: A;
};
export declare const ns1: typeof _ns_1;
export declare const ns2: (typeof _ns_1)[];
export declare const ns3: {
    a: typeof _ns_1;
};
