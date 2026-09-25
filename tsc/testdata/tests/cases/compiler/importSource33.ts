// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @lib: esnext,dom
// @strict: true
// @declaration: true
// @noImplicitReferences: true

// @filename: node_modules/a.d.ts/package.json
{
    "name": "a.d.ts",
    "exports": {
        ".": { "types": "./index.d.ts", "default": "./a.wasm" },
        "./b.d.ts": { "types": "./index.d.ts", "default": "./a.wasm" },
        "./c.d.ts": "./c.wasm",
        "./*": "./*"
    }
}

// @filename: node_modules/a.d.ts/index.d.ts
declare const a: string;
export default a;

// @filename: node_modules/a.d.ts/a.wasm

// @filename: node_modules/a.d.ts/c.d.wasm.ts
export {};

// @filename: node_modules/@a/b.d.ts/package.json
{ "name": "@a/b.d.ts", "exports": "./a.wasm" }

// @filename: node_modules/@a/b.d.ts/a.wasm

// @filename: index.ts
import a from "a.d.ts";
import source b from "a.d.ts";
import source c from "a.d.ts/b.d.ts";
import source d from "a.d.ts/c.d.ts";
import source e from "@a/b.d.ts";

export const f: string = a;
export const g: WebAssembly.Module = b;
export const h: WebAssembly.Module = c;
export const i: WebAssembly.Module = d;
export const j: WebAssembly.Module = e;

export const k = import.source("a.d.ts");
export const l = import.source("a.d.ts/b.d.ts");
export const m = import.source("a.d.ts/c.d.ts");
export const n = import.source("@a/b.d.ts");
export { a, b, c, d, e };

import source o from "a.d.ts/c.d.wasm.ts";
import.source("a.d.ts/c.d.wasm.ts");
