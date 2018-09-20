//// [tests/cases/compiler/importShouldNotBeElidedInDeclarationEmit.ts] ////

//// [umd.d.ts]
export as namespace UMD;

export type Thing = {
    a: number;
}

export declare function makeThing(): Thing;
//// [index.ts]
import { makeThing } from "umd";
export const thing = makeThing();


//// [index.js]
"use strict";
exports.__esModule = true;
var umd_1 = require("umd");
exports.thing = umd_1.makeThing();


//// [index.d.ts]
export declare const thing: import("umd").Thing;
