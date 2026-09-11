// @module: esnext
// @target: esnext
// @strict: true
// @declaration: true
// @noImplicitReferences: true
// @lib: esnext

// @filename: a.wasm

// @filename: globals.d.ts
declare namespace WebAssembly {
    type Module<T> = { value: T };
}

// @filename: index.ts
/// <reference path="globals.d.ts" preserve="true" />
import source a from "./a.wasm";
export const value = a.value;
export const promise = import.source("./a.wasm");
