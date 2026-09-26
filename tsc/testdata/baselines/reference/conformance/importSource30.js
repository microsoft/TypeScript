//// [tests/cases/conformance/importSource/importSource30.ts] ////

//// [a.wasm]

//// [globals.d.ts]
declare namespace WebAssembly {
    type Module<T> = { value: T };
}

//// [index.ts]
/// <reference path="globals.d.ts" preserve="true" />
import source a from "./a.wasm";
export const value = a.value;
export const promise = import.source("./a.wasm");


//// [index.js]
/// <reference path="globals.d.ts" preserve="true" />
import source a from "./a.wasm";
export const value = a.value;
export const promise = import.source("./a.wasm");


//// [index.d.ts]
/// <reference path="globals.d.ts" preserve="true" />
export declare const value: any;
export declare const promise: Promise<any>;
