//// [tests/cases/compiler/deferredMappedTypeCircularArguments.ts] ////

//// [mapped.ts]
export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };

//// [usage.ts]
import type { M } from "./mapped.js";
declare const array: M<string[]>;
declare const tuple: M<[string]>;
export const a = array[0];
export const b = tuple[0];


//// [mapped.js]
export {};
//// [usage.js]
export const a = array[0];
export const b = tuple[0];


//// [mapped.d.ts]
export type M<T> = {
    [K in keyof T]: T extends M<T> ? 1 : 2;
};
//// [usage.d.ts]
export declare const a: any;
export declare const b: any;
