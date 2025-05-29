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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComp = void 0;
const ns = require("mod");
const Ctor = ns.default;
exports.MyComp = Ctor.extends({ foo: "bar" });


//// [index.d.ts]
import * as ns from "mod";
export declare const MyComp: import("mod").ExtendedCtor<import("mod").Ctor>;


//// [DtsFileErrors]


index.d.ts(2,44): error TS2694: Namespace '"node_modules/mod/index"' has no exported member 'ExtendedCtor'.


==== node_modules/mod/ctor.d.ts (0 errors) ====
    export interface Ctor {
        x: number;
    }
    export type ExtendedCtor<T> = {x: number, ext: T};
    export interface CtorConstructor {
        extends<T>(x: T): ExtendedCtor<T extends unknown ? Ctor : undefined>;
    }
    export const Ctor: CtorConstructor;
==== node_modules/mod/index.d.ts (0 errors) ====
    import { Ctor } from "./ctor";
    export default Ctor;
==== index.d.ts (1 errors) ====
    import * as ns from "mod";
    export declare const MyComp: import("mod").ExtendedCtor<import("mod").Ctor>;
                                               ~~~~~~~~~~~~
!!! error TS2694: Namespace '"node_modules/mod/index"' has no exported member 'ExtendedCtor'.
    