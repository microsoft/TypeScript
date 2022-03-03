//// [tests/cases/compiler/declarationsIndirectGeneratedAliasReference.ts] ////

//// [ctor.d.ts]
export interface Ctor {
    x: number;
}
export type ExtendedCtor<T> = {x: number, ext: T};
export interface CtorConstructor {
    extends<T>(x: T): ExtendedCtor<T extends unknown ? Ctor : undefined>;
}
export const Ctor: CtorConstructor;
//// [index.d.ts]
import { Ctor } from "./ctor";
export default Ctor;
//// [index.ts]
import * as ns from "mod";
const Ctor = ns.default;
export const MyComp = Ctor.extends({foo: "bar"});


//// [index.js]
"use strict";
exports.__esModule = true;
exports.MyComp = void 0;
var ns = require("mod");
var Ctor = ns["default"];
exports.MyComp = Ctor["extends"]({ foo: "bar" });


//// [index.d.ts]
import * as ns from "mod";
export declare const MyComp: import("mod/ctor").ExtendedCtor<ns.default>;
