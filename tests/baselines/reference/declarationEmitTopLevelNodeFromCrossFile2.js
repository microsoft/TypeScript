//// [tests/cases/compiler/declarationEmitTopLevelNodeFromCrossFile2.ts] ////

//// [a.ts]
import { boxedBox } from "./boxedBox";

export const _ = boxedBox;

// At index 83
/**
 * wat
 */

//// [boxedBox.d.ts]
export declare const boxedBox: import("./box").Box<{
    boxed: import("./box").Box<number>;
}>;                        // ^This is index 83 in this file

//// [box.d.ts]
export declare class Box<T> {
    value: T;
    constructor(value: T);
}
export declare function box<T>(value: T): Box<T>;

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = void 0;
var boxedBox_1 = require("./boxedBox");
exports._ = boxedBox_1.boxedBox;
// At index 83
/**
 * wat
 */


//// [a.d.ts]
export declare const _: import("./box").Box<{
    boxed: import("./box").Box<number>;
}>;
/**
 * wat
 */
