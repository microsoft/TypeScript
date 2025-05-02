//// [tests/cases/compiler/importTypeGenericArrowTypeParenthesized.ts] ////

//// [module.d.ts]
declare module "module" {
    export interface Modifier<T> { }

    export function fn<T>(x: T): Modifier<T>;
}
//// [index.ts]
import { fn } from "module";

export const fail1 = fn(<T>(x: T): T => x);
export const fail2 = fn(function<T>(x: T): T {
  return x;
});

export const works1 = fn((x: number) => x);
type MakeItWork = <T>(x: T) => T;
export const works2 = fn<MakeItWork>(x => x);


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.works2 = exports.works1 = exports.fail2 = exports.fail1 = void 0;
var module_1 = require("module");
exports.fail1 = (0, module_1.fn)(function (x) { return x; });
exports.fail2 = (0, module_1.fn)(function (x) {
    return x;
});
exports.works1 = (0, module_1.fn)(function (x) { return x; });
exports.works2 = (0, module_1.fn)(function (x) { return x; });


//// [index.d.ts]
export declare const fail1: import("module").Modifier<(<T>(x: T) => T)>;
export declare const fail2: import("module").Modifier<(<T>(x: T) => T)>;
export declare const works1: import("module").Modifier<(x: number) => number>;
type MakeItWork = <T>(x: T) => T;
export declare const works2: import("module").Modifier<MakeItWork>;
export {};
