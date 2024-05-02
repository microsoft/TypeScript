//// [tests/cases/compiler/declarationEmitScopeConsistency2.ts] ////

//// [g.ts]
const p = Symbol();
//// [a.ts]
export const f = (x: {[p]: ""}) => x as {[p]: ""};

//// [b.ts]
import { f } from "./a";
export const p = Symbol();
export const g = f;


//// [g.js]
"use strict";
const p = Symbol();
//// [a.js]
export const f = (x) => x;
//// [b.js]
import { f } from "./a";
export const p = Symbol();
export const g = f;


//// [g.d.ts]
declare const p: unique symbol;
//// [a.d.ts]
export declare const f: (x: {
    [p]: "";
}) => {
    [p]: "";
};
//// [b.d.ts]
export declare const p: unique symbol;
export declare const g: (x: {
    [p]: "";
}) => {
    [p]: "";
};
