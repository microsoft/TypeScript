//// [tests/cases/compiler/declarationEmitScopeConsistency.ts] ////

//// [a.ts]
export interface A { a: number }
export const f = (x: A) => x as A;

//// [b.ts]
import { f } from "./a";
export interface A { other: number }
export const g = f;


//// [a.js]
export const f = (x) => x;
//// [b.js]
import { f } from "./a";
export const g = f;


//// [a.d.ts]
export interface A {
    a: number;
}
export declare const f: (x: A) => A;
//// [b.d.ts]
export interface A {
    other: number;
}
export declare const g: (x: import("./a").A) => import("./a").A;
