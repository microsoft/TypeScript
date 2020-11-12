//// [tests/cases/compiler/importHelpersOnlyDirectESM.ts] ////

//// [a.ts]
const a = [1, 2];
const b = [3, 4]
export const c = [...a, ...b];

//// [tslib.d.ts]
export declare function __read(o: any, n?: number): any[];
export declare function __spread(...args: any[][]): any[];

//// [a.js]
import { __spread } from "tslib";
var a = [1, 2];
var b = [3, 4];
export var c = __spread(a, b);
