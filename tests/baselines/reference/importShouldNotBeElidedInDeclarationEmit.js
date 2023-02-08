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
Object.defineProperty(exports, "__esModule", { value: true });
exports.thing = void 0;
var umd_1 = require("umd");
exports.thing = (0, umd_1.makeThing)();


//// [index.d.ts]
export declare const thing: import("umd").Thing;
